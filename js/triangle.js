window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60);};}();

setTimeout( function(){
var c = document.getElementById( 'c' ),
    cw = c.width = window.innerWidth,
    ch = c.height = window.innerHeight,
    ctx = c.getContext( '2d' ),
    sets = [],
    setCount = 6,
    pointsPerSet = 3,
    edgeExtend = 200,
    maxVel = 2,
    saturation = 30,
    alpha = 0.1,
    tick = 0;

function rand( min, max ) {
	return Math.random() * ( max - min ) + min;
}

function initSets() {
  var i = setCount;
  while( i-- ) {
    var set = [],
        j = pointsPerSet;
    while( j-- ) {
      set.push( {
        x: rand( 0, cw ),
        y: rand( 0, ch ),
        vx: rand( -maxVel, maxVel),
        vy: rand( -maxVel, maxVel)
      } );
    }
    sets.push( set );
  }
}

function loop() {
  requestAnimFrame( loop );
  var i = sets.length;
  while( i-- ) {
    var lightness = 50 + Math.cos( ( tick + ( i * 100 ) ) / 50 ) * 50;
    ctx.strokeStyle = 'hsla(' + ( 120 + ( tick / 10 ) ) + ', ' + saturation + '%, ' + lightness + '%, ' + alpha + ')';
    var j = sets[ i ].length;
    ctx.beginPath();
    ctx.moveTo( sets[ i ][ j - 1 ].x, sets[ i ][ j - 1 ].y );
    while( j-- ) {
      var pnt = sets[ i ][ j ];
      pnt.x += pnt.vx;
      pnt.y += pnt.vy;
      if( pnt.x > cw + edgeExtend || pnt.x < -edgeExtend ) { pnt.vx = -pnt.vx; }
      if( pnt.y >= ch + edgeExtend || pnt.y < - edgeExtend ) { pnt.vy = -pnt.vy; }
      if( j != sets[ i ].length - 1 ) {
        ctx.lineTo( pnt.x, pnt.y );
      }
    }
    ctx.closePath();
    ctx.stroke();
  }
  tick++;
}

initSets();
loop();
}, 100 );
