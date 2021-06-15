import * as THREE from 'three';
import React from 'react';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Scene extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            origin: new THREE.Vector3(0,0,0),
            thr: 15,
            totPoints: 2500,
            delta: .1,
            colors: [
                new THREE.Color(0xd0efff),
                new THREE.Color(0x187bcd),
                new THREE.Color(0x1b677e)
            ],
            mouse: {
                x: 0,
                y: 0
            },
            cameraStartingPos: new THREE.Vector3(-100, 0, 350),
            cameraEndPos: new THREE.Vector3(130, 0, 80),
            animationStartTime: null,
            clicked: false,
            cameraDirection: 1,
            cameraStillMoving: false
        };
    }

    _setMaxPoints = (n) => {
        this.setState( { totPoints: n } );
    }

    _setThreshold = (thr) => {
        this.setState( { thr: thr } );
    }

    _setDelts = (delta) => {
        this.setState( { delta: delta } );
    }

    _setColors = (colors) => {
        this.setState( { colors: colors } );
    }

    _easeOutExpo = (x) => {
        return 1 - Math.pow(1 - x, 4);
    }

    _bezier = (t) => {
        return t * t * (3 - 2 * t);
    }
    
    _updateCameraPosition = () => {

        var start_x = this.state.cameraDirection === 1 ? this.state.cameraStartingPos.x : this.state.cameraEndPos.x;
        var end_x = this.state.cameraDirection === 1 ? this.state.cameraEndPos.x : this.state.cameraStartingPos.x;
        var start_z = this.state.cameraDirection === 1 ? this.state.cameraStartingPos.z : this.state.cameraEndPos.z;
        var end_z = this.state.cameraDirection === 1 ? this.state.cameraEndPos.z : this.state.cameraStartingPos.z;
        
        var progress_x = Math.round((((this.camera.position.x - start_x) / (end_x - start_x)) + Number.EPSILON) * 100) / 100;
        var progress_z = Math.round((((this.camera.position.z - start_z) / (end_z - start_z)) + Number.EPSILON) * 100) / 100;
        if (progress_x !== 1){
            var amount_x = this._easeOutExpo((this.clock.elapsedTime - this.state.startTime) *2.5);
            var interpolated_x = start_x + amount_x * (end_x - start_x);
            this.camera.position.setX(interpolated_x)
        }
        if (progress_z !== 1){
            var amount_z = this._easeOutExpo((this.clock.elapsedTime - this.state.startTime) *2.5);
            var interpolated_z = start_z + amount_z * (end_z - start_z);
            this.camera.position.setZ(interpolated_z)
        }

        if (progress_z === 1 && progress_x === 1)
            this.setState( { cameraStillMoving: false } );
    }

    createCanvas = (document, container) => {
        var canvas = document.createElement("canvas");
        canvas.className = "scene";
        canvas.container = document.getElementById(container);
        canvas.container.appendChild(canvas);

        return canvas;
    }

    rendererSetup = (canvas) => {
        var width = canvas.offsetWidth,
            height = canvas.offsetHeight;
        var renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height, false);
        
        return renderer;
    }

    raycasterSetup = (threshold) => {
        var raycaster = new THREE.Raycaster();
        raycaster.params.Points.threshold = threshold;

        return raycaster;
    }

    cameraSetup = (fov, width, height, near, far, x_pos, y_pos, z_pos) => {
        var camera = new THREE.PerspectiveCamera(fov, width/height, near, far);
        camera.position.set(x_pos, y_pos, z_pos);
        
        camera.lookAt(this.state.origin);

        return camera;
    }

    getEuclideanFromSpherical = (theta, phi) => {
        var coords = Object();
        coords.x = Math.cos(theta) * Math.cos(phi);
        coords.y = Math.sin(phi);
        coords.z = Math.sin(theta) * Math.cos(phi);

        return coords;
    }

    movePoint = (p) => {
        var d = this.getEuclideanFromSpherical(p.vec.theta, p.vec.phi);

        //updating position, delta = distance step for each iteration
        p.vec.x += d.x * this.state.delta * p.dir;
        p.vec.y += d.y * this.state.delta * p.dir;
        p.vec.z += d.z * this.state.delta * p.dir;

        this.attributePositions.array[p.idx*3] = p.vec.x;
        this.attributePositions.array[p.idx*3+1] = p.vec.y;
        this.attributePositions.array[p.idx*3+2] = p.vec.z;

        //if points go over threshold, invert direction
        if(Math.abs(p.initial.x - p.vec.x) > this.state.thr
            || Math.abs(p.initial.y - p.vec.y) > this.state.thr
            || Math.abs(p.initial.z - p.vec.z) > this.state.thr) {
                p.dir = -p.dir;
        }
    }

    rotate = (x, y, angle) => {
        var res = {
            x: 0,
            y: 0
        };
        var r_x = x*Math.cos(angle) - y*Math.sin(angle);
        var r_y = x*Math.sin(angle) + y*Math.cos(angle);

        res.x = r_x;
        res.y = r_y;

        return res;
    }

    componentDidMount = () => {
        this.canvas = this.createCanvas(document, 'home');

        this.toMove = [];

        this.renderer = this.rendererSetup(this.canvas);
        this.scene = new THREE.Scene();

        this.raycaster = this.raycasterSetup(6);
        this.camera = this.cameraSetup(50, this.canvas.offsetWidth, this.canvas.offsetHeight, .1, 2000, this.state.cameraStartingPos.x, this.state.cameraStartingPos.y, this.state.cameraStartingPos.z);

        var group = new THREE.Group();
        this.scene.add(group);

        //create dots
        var loader = new THREE.TextureLoader();
        loader.setCrossOrigin("");
        var dotTexture = loader.load("dotTexture.png");
        dotTexture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();

        //TODO: use only the bufferGeometry
        this.dotsGeometry = new THREE.Geometry();
        var positions = new Float32Array(this.state.totPoints * 3);
        var sizes = new Float32Array(this.state.totPoints);
        var colorsAttr = new Float32Array(this.state.totPoints * 3);
        
        for (var i = 0; i < this.state.totPoints; i++) {
            var vector = new THREE.Vector3();

            //calculating color and spherical coordinates
            vector.color = Math.floor(Math.random() * this.state.colors.length);
            
            //for double helix
            /*const a = .7, b = 2;
            vector.theta = Math.random() * Math.PI * 2;
            vector.phi = (1 - Math.sqrt(Math.random())) * Math.PI / 2 * (Math.random() > .5 ? 1 : -1);

            var symmetry = Math.random() > .5? 1 : -1;

            var x = Math.random()
            
            vector.z = x * a * Math.sin(vector.theta) * symmetry
            vector.x = x * a * Math.cos(vector.theta) * symmetry
            vector.y = b * vector.theta - 4*/

            //for mobius
            /*vector.theta = Math.random() * Math.PI * 2
            vector.phi = (1 - Math.sqrt(Math.random())) * Math.PI / 2 * (Math.random() > .5 ? 1 : -1);

            //v rescaled to be in -1, 1 range
            vector.u = (Math.random() *  2) - 1
            
            vector.x = (1.25 + (vector.u / 2) * Math.cos(vector.theta / 2)) * Math.cos(vector.theta)
            vector.y = (1.25 + (vector.u / 2) * Math.cos(vector.theta / 2)) * Math.sin(vector.theta)
            vector.z = (vector.u / 2) * Math.sin(vector.theta / 2)*/
            
            
            // for sphere
            vector.theta = Math.random() * Math.PI * 2;
            vector.phi = (1 - Math.sqrt(Math.random())) * Math.PI / 2 * (Math.random() > .5 ? 1 : -1);

            var coords = this.getEuclideanFromSpherical(vector.theta, vector.phi);
            vector.x = coords.x;
            vector.y = coords.y;
            vector.z = coords.z;

            //for spirals
            //https://www.wolframalpha.com/input/?i=logarithmic+spiral+a+%3D+1+b+%3D+0.5
            /*var symmetry = Math.floor(Math.random() * 4);
            //spiral constants
            const a = 1, b = .5;
            var x, y;
            if(symmetry === 0){  
                x = a * Math.exp(b * vector.theta) * Math.cos(vector.theta);
                y = a * Math.exp(b * vector.theta) * Math.sin(vector.theta);
            }
            if(symmetry === 1) {
                
                y = a * Math.exp(b * vector.theta) * Math.cos(vector.theta);
                x = -a * Math.exp(b * vector.theta) * Math.sin(vector.theta);
            }
            if(symmetry === 2) {
                
              x = -a * Math.exp(b * vector.theta) * Math.cos(vector.theta);
              y = -a * Math.exp(b * vector.theta) * Math.sin(vector.theta);
            }
            if(symmetry === 3) {
                
                y = -a * Math.exp(b * vector.theta) * Math.cos(vector.theta);
                x = a * Math.exp(b * vector.theta) * Math.sin(vector.theta);
            }
            //var coords = this.getEuclideanFromSpherical(vector.theta, vector.phi);
            vector.x = x;
            vector.y = y;
            vector.z = 0;*/


            //increase sphere radius. scaleX is there in case
            //i wish to add hover effects
            vector.multiplyScalar(100 + (Math.random() - 0.5) * 2);

            if(Math.random() > .5) {
                var dir = Math.random() > .5 ? 1 : -1;
                var p = {
                    initial: vector.clone(),
                    vec: vector,
                    idx: i,
                    dir: dir
                };
                this.toMove.push(p)
            }
            this.dotsGeometry.vertices.push(vector);
            vector.toArray(positions, i * 3);
            this.state.colors[vector.color].toArray(colorsAttr, i*3);
            sizes[i] = 4;
            if (i > 100) {
                var value = Math.floor(100*(i-100)/this.state.totPoints);
                if (value % 10 === 0) {
                    this.props.progressCallback(value);
                }
            }
        }
        var bufferWrapGeom = new THREE.BufferGeometry();
		this.attributePositions = new THREE.BufferAttribute(positions, 3);
		bufferWrapGeom.setAttribute('position', this.attributePositions);
		this.attributeSizes = new THREE.BufferAttribute(sizes, 1);
		bufferWrapGeom.setAttribute('size', this.attributeSizes);
		this.attributeColors = new THREE.BufferAttribute(colorsAttr, 3);
		bufferWrapGeom.setAttribute('color', this.attributeColors);
		var shaderMaterial = new THREE.ShaderMaterial({
			uniforms: {
				texture: {
					value: dotTexture
				}
			},
			vertexShader: document.getElementById("wrapVertexShader").textContent,
            fragmentShader: document.getElementById("wrapFragmentShader").textContent,
            transparent: true,
            opacity: 0.6
		});
        this.wrap = new THREE.Points(bufferWrapGeom, shaderMaterial);
        this.wrap.translateX(150);

        this.scene.add(this.wrap);
        
        //create segments
        this.segmentsGeom = new THREE.Geometry();
        var segmentsMat = new THREE.LineBasicMaterial({
            color: 0xffffff,
            opacity: 0.25,
            vertexColors: THREE.VertexColors,
            transparent: true
        });

        for(i = 0; i < this.dotsGeometry.vertices.length - 1; i++) {
            var v = this.dotsGeometry.vertices[i];
            for (var j = 0; j < this.dotsGeometry.vertices.length - 1; j++) {
                if (i !== j && v.distanceTo(this.dotsGeometry.vertices[j]) < 13) {
                    this.segmentsGeom.vertices.push(v);
                    this.segmentsGeom.vertices.push(this.dotsGeometry.vertices[j]);
                    this.segmentsGeom.colors.push(this.state.colors[v.color]);
                    this.segmentsGeom.colors.push(this.state.colors[v.color]);
                }
            }
        }

        this.segments = new THREE.LineSegments(this.segmentsGeom, segmentsMat);
        this.segments.translateX(150);
        group.add(this.segments);

        window.addEventListener("mousemove",this.mouseMovementHandler);
        window.addEventListener("resize", this.resizeHandler);
        document.getElementById("header-container").addEventListener("click", this.canvasClickHandler)
        this.canvas.addEventListener("click", this.canvasClickHandler)
        this.mouse = new THREE.Vector2(-100,-100);
        this.clock = new THREE.Clock();
        this.props.progressCallback(100);
        this.currHovered = [];
        this.prevHovered = [];
        this.start();
    }

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    }

    animate = () => {
        this.dotsGeometry.verticesNeedUpdate = true;
        this.segmentsGeom.verticesNeedUpdate = true;

        this.wrap.rotation.z += .001;
        this.segments.rotation.z += .001;
        
        
        /*this.camera.position.x += (  (this.state.mouse.x * 50) - this.camera.position.x ) * .1;
        this.camera.position.y += ( -(this.state.mouse.y * 50) - this.camera.position.y ) * .1;
        this.camera.lookAt(this.state.origin);*/

        if(this.state.cameraStillMoving)
            this._updateCameraPosition();
        else if(!this.state.clicked){
            this.wrap.rotation.x = (  (this.state.mouse.x )) * .05;
            this.wrap.rotation.y = (  (this.state.mouse.y )) * .05;
            this.segments.rotation.x = (  (this.state.mouse.x )) * .05;
            this.segments.rotation.y = (  (this.state.mouse.y )) * .05;
        }
        

        this.toMove.forEach(p => {
            this.movePoint(p);
        }); 

        //raycasting for dot hovering
        this.raycaster.setFromCamera(this.state.mouse, this.camera);
        var intersections = this.raycaster.intersectObjects([this.wrap], true);

        this.currHovered.forEach(i => {
            if(!intersections.some(x => x.index === i)) {
                this.currHovered.splice(this.currHovered.indexOf(i), 1);
                this.prevHovered.push(i.index);
            }
        });

        if(this.clock.getElapsedTime() >= 1) {
            if (intersections.length) {
                for(var i = 0; i < intersections.length; i++) {
                    var index = intersections[i].index;
                    if(this.currHovered.indexOf(index) === -1 && this.prevHovered.indexOf(index) === -1) {
                        var values = [[0, 1, 0.584], [1, 0.698, 0.16], [ 1, 0.45, 0.278]];
                        var color = Math.floor(Math.random() * values.length);
                        this.currHovered.push({index: index, color: values[color]});
                    };
                 }
            }
        }

        this.onDotHover();
        this.mouseOut();
        this.clock.getElapsedTime();
        this.attributeSizes.needsUpdate = true;
        this.attributePositions.needsUpdate = true;
        this.renderScene();
        this.frameId = requestAnimationFrame(this.animate);
    }

    renderScene = () => {
        this.renderer.render(this.scene, this.camera);
    }

    stop = () => {
        cancelAnimationFrame(this.frameId);
    }

    componentWillUnmount = () => {
        this.stop();
        window.removeEventListener("resize", this.resizeHandler);
        window.removeEventListener("mousemove", this.mouseMovementHandler);
        document.getElementById("header-container").removeEventListener("click", this.canvasClickHandler);
        this.canvas.removeEventListener("click", this.canvasClickHandler);
    }

    //handlers
    mouseMovementHandler = (e) => {
        var canvasBounding = this.canvas.getBoundingClientRect();
		var x = ((e.clientX - canvasBounding.left) /this.canvas.offsetWidth) * 2 - 1;
        var y = -((e.clientY - canvasBounding.top) / this.canvas.offsetHeight) * 2 + 1;
        this.setState({
            mouse: {
                x: x,
                y: y
            }
        });
    }

    resizeHandler = (e) => {
        var width = this.canvas.offsetWidth;
        var height = this.canvas.container.offsetHeight;
        this.canvas.height = this.canvas.offsetHeight;
        this.canvas.width = this.canvas.container.offsetWidth;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height, false);
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }

    onDotHover = () => {            
        /*
            0, 1, 0.584 -> #00ff95
            1, 0.698, 0.16 -> #ffb229
            1, 0.45, 0.278 -> #ff7347
            0.278, 0.819, 1 -> #47d1ff
        */
        this.currHovered.forEach(x => {
            let r_val = x.color[0];
            let g_val = x.color[1];
            let b_val = x.color[2];    
            //r
            //var distance = this.attributeColors.array[x*3] - r_val;
            this.attributeColors.array[x.index*3] = r_val;
            
            //g
            //distance = this.attributeColors.array[(x*3) + 1] - g_val;
            this.attributeColors.array[(x.index*3) + 1] = g_val;

            //b
            //distance = this.attributeColors.array[(x*3) + 2] - b_val;
            this.attributeColors.array[(x.index*3) + 2] = b_val;
            this.attributeSizes.array[x.index] = 8;
        })
        this.attributeColors.needsUpdate = true;
        
    }

    mouseOut = () => {
        var step = 0.0035;

        this.prevHovered.forEach(x => {
            var done = 0;
            var original_color = this.state.colors[this.dotsGeometry.vertices[x].color].toArray();
            this.attributeSizes.array[x] -= .05;
            if(this.attributeSizes.array[x] <= 4) {
                this.attributeSizes.array[x] = 4;
                done++;
            }
            for (var i = 0; i < 3; i++) {

                var sign = Math.sign(original_color[i] - this.attributeColors.array[(x * 3) + i]);
                this.attributeColors.array[(x * 3) + i] += sign * step;
                if ((sign >= 0 && this.attributeColors.array[(x * 3) + i] >= original_color[i])
                || (sign <= 0 && this.attributeColors.array[(x * 3) + i] <= original_color[i])) {
                    this.attributeColors.array[(x * 3) + i] = original_color[i]
                    done++;
                }
            }
            if (done === 4) {
                this.prevHovered.splice(this.prevHovered.indexOf(x), 1);
            }
        })
    }

    canvasClickHandler = () => {
        if (!this.state.cameraStillMoving){
            this.setState( { clicked: !this.state.clicked } );
            this.setState( { cameraStillMoving: true } );
            this.setState( { startTime: this.clock.elapsedTime } );
            if (this.state.clicked) {
                this.setState( { cameraDirection : 1 } );
            }
            else {
                this.setState( { cameraDirection : -1 } );
            }
        }
    }

    render() {
        return null;
    }
}