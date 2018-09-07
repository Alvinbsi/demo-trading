import { Injectable } from '@angular/core';


@Injectable()
export class UtilityService {

  constructor() {

  }


  /* Scroll to Section */
  scrollToY(scrollTargetY, speed, easing) {
    (<any>window).requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              (<any>window).mozRequestAnimationFrame    ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();


    var scrollY = window.scrollY,
        scrollTargetY = scrollTargetY || 0,
        speed = speed || 2000,
        easing = easing || 'easeOutSine',
        currentTime = 0;

    var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

    var PI_D2 = Math.PI / 2,
        easingEquations = {
            easeOutSine: function (pos) {
                return Math.sin(pos * (Math.PI / 2));
            },
            easeInOutSine: function (pos) {
                return (-0.5 * (Math.cos(Math.PI * pos) - 1));
            },
            easeInOutQuint: function (pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5);
                }
                return 0.5 * (Math.pow((pos - 2), 5) + 2);
            }
        };

    function tick() {
        currentTime += 1 / 60;
        console.log(easing);
        var p = currentTime / time;
        var t = easingEquations[easing](p);

        if (p < 1) {
          (<any>window).requestAnimFrame(tick);

            window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
        } else {
            console.log('scroll done');
            window.scrollTo(0, scrollTargetY);
        }
    }
    tick();
  }

  checkMobileDevice() {
    return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
  }


  filterArrayObj(arr,prop,val) {
    console.log('arr',arr);console.log('prop',prop); console.log('value',val);
    let filteredVal = arr.filter( item => {
      return item[prop] == val;
    });
    return filteredVal;
  }


  filterObj(arr,prop,val) {
    let filteredVal = arr.filter( item => {
      return item[prop] != val;
    });
    return filteredVal;
  }

  changeArrayObjProp(arr,match,value,prop,val) {
    arr.forEach(function(item, index, array) {
      if( item[match] == value ) item[prop] = val;
    });
    return arr;
  }

  addPropInObj(obj,prop,val) {
    if(obj.length > 0 ) {
      obj.forEach(ele => {
        prop.forEach((item,index) => {
          ele[item] = val[index];
        });
      });
    }
    return obj;
  }

  getPropValFromObj(obj,check_prop,prop,val) {
    let propVal = '';
    if(obj.length > 0 ) {
      obj.forEach(ele => {
        if( ele[check_prop] == val ) propVal = ele[prop];
      });
    }
    return propVal;
  }




}
