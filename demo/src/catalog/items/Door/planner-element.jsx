import React from 'react';
import * as Three from 'three';
import { Mesh, MeshLambertMaterial } from 'three';

const black = new Three.MeshLambertMaterial({color : 0x000000});
const green = new Three.MeshLambertMaterial( {color : 0xcccccc});
const red = new Three.MeshLambertMaterial({color : 0xFF0000});
const turquoise = new Three.MeshLambertMaterial({color : 0x43C6DB,opacity :0.7,transparent: true});
const metalBlue = new Three.MeshLambertMaterial({color : 0xB7CEEC});
const darkGrey = new Three.MeshLambertMaterial({color : 0x313131});
const darkGrey2 = new Three.MeshLambertMaterial({color : 0x212121});
const purple = new Three.MeshLambertMaterial({color : 0x800080});
const lime = new Three.MeshLambertMaterial({color : 0x38f470});
const metalBlueGrey = new Three.MeshLambertMaterial({color : 0x566D7E});

let flip_value;
let handleSide_value;

function makePanicDoor(handleSide) {

  let panicDoor = new Three.Mesh();
  let leftDoor = makeDoorStructure();
  let handle = makeHandle(handleSide);
  let leftDoorPivot = makePivot();
  let rightDoorPivot = makePivot();
  let safetyHandleLeft = makeSafetyHandle();
  let safetyHandleRight = makeSafetyHandle();
  let hilt = makeLock();
  let doorLock = makeDoorLock();
  hilt.position.set(-0.05,-0.02,0.03);
  handle.position.set(-0.47/2,0.85/2,-0.03);

  if(handleSide) {
    leftDoorPivot.position.set(0.595 / 2, 0, -0.06 / 2);
  }
  else {
    leftDoorPivot.position.set(-0.595 / 2, 0, -0.06 / 2);
  }
  rightDoorPivot.position.set(0.6/2 ,0,0.077/2);
  safetyHandleLeft.position.set(0,0.4,0.06/2);
  safetyHandleRight.position.set(0,0.4,-0.062/2);
  handle.add(hilt);
  leftDoor.add(handle);
  leftDoor.add(safetyHandleLeft);
  leftDoor.add(leftDoorPivot);
  panicDoor.add(leftDoor);
  leftDoor.add(doorLock);

  return panicDoor
}

function makeDoorLock () {

  let DoorLock = new Three.Object3D();
  let doorLockGeometry1 = new Three.CylinderGeometry(0.012,0.012,1.905,Math.round(32));
  let doorLockGeometry2 = new Three.CylinderGeometry(0.007,0.007,1.907,Math.round(32));
  let doorLock1 = new Three.Mesh( doorLockGeometry1, purple);
  let doorLock2 = new Three.Mesh( doorLockGeometry2, purple);
  DoorLock.position.set(-0.275,0.7/2,0);
  DoorLock.scale.x =1/1.3;
  /*doorLock1.add(doorLock2);
  DoorLock.add(doorLock1);*/
  return DoorLock;
}
/*
function makeLock  (handleSide_value) {

  let mechanism = new Three.Object3D();
  let BaseGeometry = new Three.BoxGeometry(0.01,0.1,0.02);
  let PieceGeometry1 = new Three.BoxGeometry(0.01,0.02,0.01);
  let PieceGeometry2 = new Three.BoxGeometry(0.006,0.04,0.008);
  let base = new Three.Mesh( BaseGeometry, purple);
  let piece1 = new Three.Mesh( PieceGeometry1, lime);
  let piece2 = new Three.Mesh( PieceGeometry2, lime);
  piece1.position.set(-0.008/2,0.03,0);
  piece2.position.y =-0.05;
  piece1.add(piece2);
  base.add(piece1);
  mechanism.add(base);

  return mechanism;
}*/

function makeSafetyHandle () {

  let handle = new Three.Object3D();
  let HandleSupportGeometry = new Three.BoxGeometry(0.5,0.1,0.005);
  let PushGeometry = new Three.CylinderGeometry(0.04,0.04,0.48,Math.round(32));
  let CoverPushGeometry = new Three.CylinderGeometry(0.042,0.042,0.01,Math.round(32));
  let handleSupport = new Three.Mesh( HandleSupportGeometry, black);
  let PushButton = new Three.Mesh( PushGeometry, red);
  let CoverPush1 = new Three.Mesh( CoverPushGeometry, black);
  let CoverPush2 = new Three.Mesh( CoverPushGeometry, black);
  handleSupport.position.z =0.005/2;
  PushButton.rotation.z =Math.PI/2;
  CoverPush1.position.y =0.48/2 +0.01/2;
  CoverPush2.position.y =-0.48/2 -0.01/2;
  /*PushButton.add(CoverPush1);
  PushButton.add(CoverPush2);
  handleSupport.add(PushButton);
  handle.add(handleSupport);*/

  return handle;
}

function makePivot () {

  let DoorPivot = new Three.Object3D();
  let DownPivotGeometry = new Three.CylinderGeometry(0.009,0.009,0.04,Math.round(32));
  let UpPivotGeometry = new Three.CylinderGeometry(0.01,0.01,0.04,Math.round(32));
  let downPivot1 = new Three.Mesh( DownPivotGeometry, green);
  let upPivot1 = new Three.Mesh( UpPivotGeometry, purple);
  let downPivot2 = new Three.Mesh( DownPivotGeometry, green);
  let upPivot2 = new Three.Mesh( UpPivotGeometry, purple);
  downPivot1.position.y =-0.4;
  upPivot1.position.y =0.04;
  downPivot2.position.y =1;
  upPivot2.position.y =0.04;
  /*downPivot2.add(upPivot2);
  downPivot1.add(upPivot1);
  DoorPivot.add(downPivot2);
  DoorPivot.add(downPivot1);*/

  return DoorPivot;
}

function makeHandle (handleSide_value) {

  let handle = new Three.Object3D();
  let handleBase = makeHandleBase(handleSide_value);
  let plunger = makeLock(handleSide_value);
  let hilt = makeHilt();
  hilt.rotation.x = Math.PI / 2;

  if(handleSide_value) {
    hilt.position.set(0, 0.04, -0.03 / 2 - 0.01 / 2);
    plunger.position.set(0.01,0.1,0.02);
  }
  else {
    hilt.position.set(0.4, 0.04, -0.03 / 2 - 0.01 / 2);
    plunger.position.set(0.05,0.1,0.02)
    hilt.rotation.y = Math.PI ;
  }
  handle.add(handleBase);
  handle.add(hilt);
  handle.add(plunger);
  handle.scale.set(1.1, 1.1, 1.1);
  return handle;
}

function makeHilt () {

  let hilt = new Three.Object3D();
  let Geometry_p1 = new Three.CylinderGeometry(0.01,0.01,0.03,Math.round(32));
  let Geometry_p2 = new Three.SphereGeometry(0.01,Math.round(32),Math.round(32));
  let Geometry_p3 = new Three.CylinderGeometry(0.01,0.01,0.07,Math.round(32));
  let Geometry_p4 = new Three.CylinderGeometry(0.01,0.01,0.03,Math.round(32));
  let Geometry_p5 = new Three.SphereGeometry(0.01,Math.round(32),Math.round(32));
  let Geometry_p6 = new Three.CylinderGeometry(0.01,0.01,-0.07,Math.round(32));
  let piece1 = new Three.Mesh( Geometry_p1, black);
  let piece2 = new Three.Mesh( Geometry_p2, black);
  let piece3 = new Three.Mesh( Geometry_p3, black);
  let piece4 = new Three.Mesh( Geometry_p2, black);
  let piece5 = new Three.Mesh( Geometry_p4, black);
  let piece6 = new Three.Mesh( Geometry_p5, black);
  let piece7 = new Three.Mesh( Geometry_p6, black);
  let piece8 = new Three.Mesh( Geometry_p5, black);
  piece3.rotation.z =Math.PI/2;
  piece3.position.x =0.07/2;
  piece2.position.y =-0.03/2;
  piece4.position.y =-0.07/2;
  piece7.rotation.z =-Math.PI/2;
  piece7.position.x =0.065/2;
  piece6.position.y =.01;
  piece5.position.y =.09;
  piece8.position.y =0.065/2;
  piece3.add(piece4);
  piece2.add(piece3);
  piece1.add(piece2);
  piece7.add(piece8);
  piece6.add(piece7);
  piece5.add(piece6);
  hilt.add(piece1);
  hilt.add(piece5);
  return hilt;
}

function makeLock  (handleSide_value) {

  let mechanism = new Three.Object3D();
  let BaseGeometry = new Three.BoxGeometry(0.01,0.1,0.02);
  let PieceGeometry1 = new Three.BoxGeometry(0.01,0.02,0.01);
  let PieceGeometry2 = new Three.BoxGeometry(0.006,0.04,0.008);
  let base = new Three.Mesh( BaseGeometry, metalBlueGrey);
  let piece1 = new Three.Mesh( PieceGeometry1, metalBlue);
  let piece2 = new Three.Mesh( PieceGeometry2, metalBlue);
  piece1.position.set(-0.008/2,0.03,0);
  piece2.position.y =-0.05;
  piece1.add(piece2);
  base.add(piece1);
  mechanism.add(base);

  return mechanism;
}

function makeHandleBase (handleSide_value) {
  let base = new Three.Object3D();
  let BaseGeometry1 = new Three.BoxGeometry(0.038,0.14,0.01);
  let BaseGeometry2 = new Three.CylinderGeometry(0.023,0.023,0.01,Math.round(32));
  let BaseGeometry3 = new Three.BoxGeometry(0.038,0.14,0.01);
  let BaseGeometry4 = new Three.CylinderGeometry(0.023,0.023,0.01,Math.round(32));
  let lock = makeLockKey();
  let lock1 = makeLockKey();
  let base1 = new Three.Mesh( BaseGeometry1, black);
  let base2 = new Three.Mesh( BaseGeometry2, black);
  let base3 = new Three.Mesh( BaseGeometry3, black);
  let base4 = new Three.Mesh( BaseGeometry4, black);
  lock.rotation.x = Math.PI/2;
  base2.rotation.x = Math.PI/2;
  lock.position.y = -0.03;
  base2.position.y = -0.033;
  lock1.rotation.x = Math.PI/2;
  base4.rotation.x = Math.PI/2;
  lock1.position.y = -0.03;
  base4.position.y = -0.033;
  if(!handleSide_value)
    base1.position.x = 0.4;
  if(!handleSide_value)
    base3.position.x = 0.4;
  base2.scale.z =1.5;
  base4.scale.z =1.5;
  base3.position.z = 0.054;
  base4.position.z = 0.0;
  base1.add(lock);
  base1.add(base2);
  base.add(base1);
  base3.add(lock1);
  base3.add(base4);
  base.add(base3);
  return base;
}

function makeLockKey () {

  let Lock = new Three.Object3D();
  let geometry1 = new Three.CylinderGeometry(0.005,0.005,0.02,Math.round(32));
  let geometry2 = new Three.BoxGeometry(0.008,0.02,0.02);
  let geometry3 = new Three.BoxGeometry(0.007,0.0203,0.0018);
  let LockPiece1 = new Three.Mesh( geometry1, metalBlue);
  let LockPiece2 = new Three.Mesh( geometry2, metalBlue);
  let LockPiece3 = new Three.Mesh( geometry3, metalBlueGrey );
  LockPiece2.position.z = 0.01;
  LockPiece1.add(LockPiece2);
  LockPiece1.add(LockPiece3);
  Lock.add(LockPiece1);

  return Lock;
}

function makeDoorStructure () {

  let door = new Three.Object3D();
  let lowBaseDoorGeometry = new Three.BoxGeometry(0.58,1.2,0.01);
  let middleBaseDoorGeometry = new Three.BoxGeometry(0.2,0.7,0.01);
  let middleBaseDoorGeometry1 = new Three.BoxGeometry(0.15,0.7,0.01);
  let highBaseDoorGeometry = new Three.BoxGeometry(0.2,0.2,0.01);
  let BorderCoverDoorGeometry1 = new Three.CylinderGeometry(0.005,0.005,1.9,Math.round(32)); /*(0.005,0.005,1.9,Math.round(32))*/
  let BorderCoverDoorGeometry2 = new Three.BoxGeometry(0.03,1.9,0.01); /*(0.03,1.9,0.01)*/
  let MiddleDoorGeometry2 = new Three.BoxGeometry(0.2,0.7,0.06);
  let MiddleDoorGeometry1 = new Three.BoxGeometry(0.19,0.7,0.06);
  let HighDoorGeometry = new Three.BoxGeometry(0.2,0.2,0.06);
  let glassGeometry = new Three.BoxGeometry(0.2,0.5,0.06);
  let LowDoorGeometry = new Three.BoxGeometry(0.59,1.2,0.06);
  let glassCoverVertical = new Three.BoxGeometry(0.01,0.52,0.06);
  let glassCoverHorizontal = new Three.BoxGeometry(0.224,0.01,0.06);
  let lowCoverDoor = new Three.Mesh( lowBaseDoorGeometry, green);
  let middleDoor1 = new Three.Mesh( MiddleDoorGeometry1, green);
  let middleDoor2 = new Three.Mesh( MiddleDoorGeometry2, green);
  let baseDoor = new Three.Mesh( LowDoorGeometry, green);
  let middleCoverDoor1 = new Three.Mesh( middleBaseDoorGeometry1, green);
  let middleCoverDoor2 = new Three.Mesh( middleBaseDoorGeometry, green);
  let highCoverDoor = new Three.Mesh( highBaseDoorGeometry, green);
  let highDoor = new Three.Mesh( HighDoorGeometry, green);
  let borderCoverDoor1 = new Three.Mesh( BorderCoverDoorGeometry1, purple);
  let borderCoverDoor2 = new Three.Mesh( BorderCoverDoorGeometry2, purple);
  let glass = new Three.Mesh( glassGeometry, green);
  let glassVerticalCover1 = new Three.Mesh( glassCoverVertical, green);
  let glassVerticalCover2 = new Three.Mesh( glassCoverVertical, green);
  let glassHorizontalCover1 = new Three.Mesh( glassCoverHorizontal, green);
  let glassHorizontalCover2 = new Three.Mesh( glassCoverHorizontal, green);
  lowCoverDoor.position.set(-(0.6-0.59)/2,0,-0.05/2);
  middleCoverDoor1.position.set(-0.2,1.2/2 +0.7/2,0);
  middleCoverDoor2.position.set(0.2,1.2/2 +0.7/2,0);
  highCoverDoor.position.set(0,(0.5 +0.2)/2,-0.05/2);
  highDoor.position.set(0,(0.5 +0.2)/2,-0.05/2 +0.05/2);
  glass.position.set(-0.01/2,1.2/2 +0.5/2,0);
  middleDoor2.position.z =0.05/2;
  middleDoor1.position.set(0.005,0,0.05/2);
  borderCoverDoor1.position.set(-0.6/2,0.7/2,0);
  glassVerticalCover1.position.x = 0.2/2 +0.014/2;
  glassVerticalCover2.position.x =-0.2/2 -0.014/2;
  glassHorizontalCover1.position.y = 0.5/2 +0.014/2;
  glassHorizontalCover2.position.y =-0.5/2 -0.014/2;
  /*borderCoverDoor2.position.set(0.02/2,0,-0.01/2 );
  borderCoverDoor1.add(borderCoverDoor2);*/
  glass.add(highCoverDoor);
  glass.add(glassVerticalCover1);
  glass.add(glassVerticalCover2);
  glass.add(glassHorizontalCover1);
  glass.add(glassHorizontalCover2);
  glass.add(highCoverDoor);
  glass.add(highDoor);
  baseDoor.add(glass);
  middleCoverDoor1.add(middleDoor1);
  middleCoverDoor2.add(middleDoor2);
  /*lowCoverDoor.add(borderCoverDoor1);*/
  lowCoverDoor.add(middleCoverDoor1);
  lowCoverDoor.add(middleCoverDoor2);
  baseDoor.add(lowCoverDoor);
  door.add(baseDoor);
  door.scale.x = 1.3;
  return door;
}

export default {
  name: 'Door',
  prototype: 'items',

  info: {
    tag: ['door'],
    title: 'door',
    description: 'iron door',
    image: require('./panicDoor.png')
  },

  properties: {
    width: {
      label: 'width',
      type: 'length-measure',
      defaultValue: {
        length: 48,
        unit: 'in'
      }
    },
    height: {
      label: 'height',
      type: 'length-measure',
      defaultValue: {
        length: 84,
        unit: 'in'
      }
    },
    thickness: {
      label: 'thickness',
      type: 'length-measure',
      defaultValue: {
        length: 4,
        unit: 'in'
      }
    },
    altitude: {
      label: 'altitude',
      type: 'length-measure',
      defaultValue: {
        length: 26.5,
        unit: 'in'
      }
    },
    flip_horizontal: {
      label: 'horizontal flip',
      type: 'checkbox',
      defaultValue: 'none',
      values: {
        'none': 'none',
        'yes':  'yes'
      }
    },
    flip_vertical: {
      label: 'vertical flip',
      type: 'checkbox',
      defaultValue: 'right',
      values: {
        'right': 'right',
        'left':  'left'
      }
    },
  },


  render2D: function (element, layer, scene) {

    const STYLE_HOLE_BASE = {stroke: '#070ca6', strokeWidth: '1px', fill: '#afb5b8'};
    const STYLE_HOLE_SELECTED = {stroke: '#070ca6', strokeWidth: '1px', fill: '#afb5b8', cursor: 'move'};
    const STYLE_ARC_BASE = {stroke: '#070ca6', strokeWidth: '1px', strokeDasharray: '5,5', fill: 'none'};
    const STYLE_ARC_SELECTED = {stroke: '#070ca6', strokeWidth: '1px', strokeDasharray: '5,5', fill: 'none', cursor: 'move'};

    let epsilon = 1;

    let flip = element.properties.get('flip_horizontal');
    let handleSide = element.properties.get('flip_vertical');
    let holeWidth = element.properties.get('width').get('length');
    let holePath = `M${0} ${ -epsilon}  L${holeWidth} ${-epsilon}  L${holeWidth} ${epsilon}  L${0} ${epsilon}  z`;
    let arcPath = `M${0},${0}  A${holeWidth},${holeWidth} 0 0,1 ${holeWidth},${holeWidth}`;
    let holeStyle = element.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;
    let arcStyle = element.selected ? STYLE_ARC_SELECTED : STYLE_ARC_BASE;
    let length = element.properties.get('width').get('length');

    let scaleX, scaleY;
    let rotateAngle;
    let tX, tY;
    let pX1, pX2, pY1, pY2;

    flip ? flip_value = 'yes' : flip_value = 'none';
    handleSide ? handleSide_value = 'right' : handleSide_value = 'left';

    if(flip_value === 'yes') {
      scaleX = 1;
      if (handleSide_value === 'right') {
        tX = holeWidth;
        tY = -holeWidth;
        pX1 = -holeWidth;
        pY1 = 0;
        pX2 = -holeWidth;
        pY2 = holeWidth;
        rotateAngle = 180;
        scaleY = -1;
      }
      else {
        tX = 0;
        tY = -holeWidth;
        pX1 = 0;
        pY1 = 0;
        pX2 = 0;
        pY2 = -holeWidth;
        scaleY = 1;
        rotateAngle = 0;
      }
    }
    else if (flip_value === 'none') {
      scaleX = -1;
      if (handleSide_value === 'left') {
        tX = holeWidth;
        tY = 0;
        pX1 = 0;
        pY1 = 0;
        pX2 = 0;
        pY2 = -holeWidth;
        rotateAngle = -90;
        scaleY = -1;
      }
      else{
        tX = 0;
        tY = 0;
        pX1 = holeWidth;
        pY1 = 0;
        pX2 = holeWidth;
        pY2 = holeWidth;
        rotateAngle = 90;
        scaleY = 1;
      }
    }

      return (
        <g transform={`translate(${-element.properties.get('width').get('length') / 2}, 0)`}>
          <path key='1' d={arcPath} style={arcStyle}
                transform={`translate(${tX},${tY}) scale(${scaleX},${scaleY}) rotate(${rotateAngle})`}/>
          <line key='2' x1={pX1} y1={pY1 - epsilon} x2={pX2} y2={pY2 - epsilon} style={holeStyle}
                transform={`scale(${-scaleX},${scaleY})`}/>
          <path key='5' d={holePath} style={holeStyle}/>
        </g>

      );
  },

  render3D: function (element, layer, scene) {

    let flip = element.properties.get('flip_horizontal');
    let handleSide = element.properties.get('flip_vertical');
    let width = element.properties.get('width').get('length');
    let height = element.properties.get('height').get('length');
    let thickness = element.properties.get('thickness').get('length');
    let newAltitude = element.properties.get('altitude').get('length');

    Mesh.recieveShadow = true;
    Mesh.cashShadow = true;
    
    let panicDoor = new Three.Object3D();
    panicDoor.add(makePanicDoor(handleSide).clone());

    if (element.selected) {
      let boundingBox = new Three.BoxHelper(panicDoor, 0x99c3fb);
      boundingBox.material.linewidth = 5;
      boundingBox.renderOrder = 1000;
      boundingBox.material.depthTest = false;
      panicDoor.add(boundingBox);
    }

    let valuePosition = new Three.Box3().setFromObject(panicDoor);

    let deltaX = Math.abs(valuePosition.max.x - valuePosition.min.x);
    let deltaY = Math.abs(valuePosition.max.y - valuePosition.min.y);
    let deltaZ = Math.abs(valuePosition.max.z - valuePosition.min.z);

    if(flip)
      panicDoor.rotation.y += Math.PI;

    panicDoor.position.y+= newAltitude;
    panicDoor.scale.set(width / deltaX, height / deltaY, thickness / deltaZ);

    return Promise.resolve(panicDoor);

  }
};
