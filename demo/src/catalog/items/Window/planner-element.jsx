import * as Three from 'three';
import React from 'react';
import pipes from './pipe.jpg'

const WIDTH = 48;
const DEPTH = 2;
const HEIGHT = 84;

const textureLoader = new Three.TextureLoader();
const woodMaterial=textureLoader.load('http://artscube.biz/graphics/KontekBuild/catalog/items/2panel/panels.png');
const metalMaterial=textureLoader.load('http://artscube.biz/graphics/KontekBuild/catalog/items/2panel/pipe.jpg');

const objectMaxLOD = makeObjectMaxLOD();
//const objectMinLOD = makeObjectMinLOD();

function makeObjectMaxLOD() {

  let bookcase = new Three.Mesh();

  //Bookcase
  let backGeometry = new Three.BoxGeometry(0.01,2.02,0.8);
  let frontGeometry = new Three.BoxGeometry(0.01,2.02,0.8);
  let wood = new Three.MeshPhongMaterial({map:woodMaterial});
  let pipe = new Three.MeshPhongMaterial({map:metalMaterial});

  let backside = new Three.Mesh(backGeometry,pipe);
  backside.position.set(-0.003,1,0);
  bookcase.add(backside);

  let frontside = new Three.Mesh(frontGeometry,pipe);
  frontside.position.set(0.305,1,0);
  bookcase.add(frontside);

  let sideGeometry = new Three.BoxGeometry(0.055,2,0.4);
  let leftside = new Three.Mesh(sideGeometry,wood);
  leftside.position.set(0.275,1,0);//0.27,1,0
  bookcase.add(leftside);

  let rightside = new Three.Mesh(sideGeometry,wood);
  rightside.position.set(0.025,1,0);//0.025,1,0
  bookcase.add(rightside);

  let baseGeometry = new Three.BoxGeometry(0.3,0.3,0.4);
  let basePanel = new Three.Mesh(baseGeometry,wood);
  basePanel.position.set(0.1499,1.85,0);//.1499, .5, 0
  bookcase.add(basePanel);

  let upperGeometry = new Three.BoxGeometry(0.3,0.95,0.4);
  let upperPanel = new Three.Mesh(upperGeometry,wood);
  upperPanel.position.set(0.15,0.465,0); //.15, .115, 0
  bookcase.add(upperPanel);

/*(lr, ud, fb)
  let sideGeometry = new Three.BoxGeometry(0.3,2,0.03);
  let side1 = new Three.Mesh(sideGeometry,wood);
  side1.position.set(0.15,1,0.2);
  bookcase.add(side1);

  let side2 = new Three.Mesh(sideGeometry,wood);
  side2.position.set(0.15,1,-0.2);
  bookcase.add(side2);
*/
  let bottomGeometry = new Three.BoxGeometry(0.32,0.03,0.8);
  let bottomPanel = new Three.Mesh(bottomGeometry,pipe);
  bottomPanel.position.set(0.1499,2.02,0);
  bookcase.add(bottomPanel);

  let topGeometry = new Three.BoxGeometry(0.3,0.03,0.2);
  let topPanel = new Three.Mesh(topGeometry,pipe);
  topPanel.position.set(0.15,0.015,0);
  bookcase.add(topPanel);

  function choiceTexture() {

    return (Math.floor(Math.random() * 3))

  }

  return bookcase
}

export default {
  name: 'Window',
  prototype: 'items',

  info: {
    tag: ['window'],
    title: 'window',
    description: 'window',
    image: require('./kontekWindow.png')
  },

  properties: {
    altitude: {
      label: 'altitude',
      type: 'length-measure',
      defaultValue: {
        length: 0,
        unit: 'in'
      }
    },
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 48,
        unit: 'in'
      }
    },
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: {
        length: 84,
        unit: 'in'
      }
    },
    depth: {
      label: 'Depth',
      type: 'length-measure',
      defaultValue: {
        length: 2,
        unit: 'in'
      }
    }
  },

  render2D: function (element, layer, scene) {

    let rect_style = {stroke: element.selected ? '#ff0000' : '#ff0000', strokeWidth: '1px', fill: '#cccccc'};


    return (
      <g transform={ `translate(${-WIDTH},${-DEPTH})`}>
        <rect key='1' x='0' y='0' width={WIDTH} height={DEPTH} style={rect_style}/>
      </g>
    )
  },


  render3D: function (element, layer, scene) {

    let newAltitude = element.properties.get('altitude').get('length');

    /**************** lod max ******************/

    let bookcaseMaxLOD=new Three.Object3D();
    bookcaseMaxLOD.add(objectMaxLOD.clone());

    let value = new Three.Box3().setFromObject(bookcaseMaxLOD);

    let deltaX = Math.abs(value.max.x - value.min.x);
    let deltaY = Math.abs(value.max.y - value.min.y);
    let deltaZ = Math.abs(value.max.z - value.min.z);

    bookcaseMaxLOD.rotation.y+=Math.PI/1;
    bookcaseMaxLOD.position.y+= newAltitude;
    bookcaseMaxLOD.position.z+= '0';
    bookcaseMaxLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);

    /**************** lod min ******************/
/*
    let bookcaseMinLOD=new Three.Object3D();
    bookcaseMinLOD.add(objectMinLOD.clone());
    bookcaseMinLOD.rotation.y+=Math.PI/1;
    bookcaseMinLOD.position.y+= newAltitude;
    bookcaseMinLOD.position.z+= WIDTH/2;
    bookcaseMinLOD.scale.set(WIDTH / deltaX, HEIGHT / deltaY, DEPTH / deltaZ);
*/
    /**** all level of detail ***/

    let lod = new Three.LOD();
    lod.addLevel(bookcaseMaxLOD, 100);
    //lod.addLevel(bookcaseMinLOD, 500);
    lod.updateMatrix();
    lod.matrixAutoUpdate = false;
    
    let bbox = new Three.BoxHelper(lod, 0x99c3fb);
    bbox.material.linewidth = 5;
    bbox.renderOrder = 100;
    bbox.material.depthTest = false;
    lod.add(bbox);
    
    return Promise.resolve(lod);

}

};


