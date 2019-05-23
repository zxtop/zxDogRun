import {Application,Container,Graphics,Sprite, Point} from 'pixi.js';
import { getAnimation, getSound, load, createSprite,  getTexture} from '../loader';
import {TweenLite,TimeLine,TweenMax, TimelineMax, Power1} from 'gsap';
import {AnswerInfo,Loading,Question} from 'xes-answer';
import { Store} from 'vuex';
import STEMTITLE from 'xes-preview-subtitle';

import {RenderPageByIndex} from 'xes-tem-render'

class Dog{

    constructor(){
        this.pixiStage = null;
        this.mainAnimate = null;
        this.man = null;
        this.dog = null;
        this.bike = null;
        this.biaochi = null;
        this.title = null;
        this.input = null;
        this.keyboard = null;

        this.keyContainer = null; //键盘存放
        this.comenContainer = null; //标尺、题目存放

        this.num = 0; //题目下标
        this.gameBg = null; //背景

        this.yz = null; //椅子
        this.moveContainer = null; //屏幕存放
        this.yz_dog = null;//椅子狗
        this.ht_dog = null;
        this.commentArr = [
            {
                biaochi_name:"image_one_dog",
                biaochi_x:825,
                biaochi_y:380,
                title_name:"image_one_qs",
                input_x:1015,
                input_y:750
            },
            {
                biaochi_name:"image_two_bike",
                biaochi_x:874,
                biaochi_y:296,
                title_name:"image_two_qs",
                input_x:975,
                input_y:750
            },
            {
                biaochi_name:"image_three_yz",
                biaochi_x:1190,
                biaochi_y:301,
                title_name:"image_three_qs",
                input_x:1000,
                input_y:750
            },
            {
                biaochi_name:"image_four_ht",
                biaochi_x:1400,
                biaochi_y:390,
                title_name:"image_four_qs",
                input_x:1020,
                input_y:750
            }
        ]
        this.keyArr = [
            
            {
                default:"image_1_2",
                hover:"image_1",
                value:"1",
                x:77,
                y:70,
                width:94,
                height:94

            },
            {
                default:"image_2_2",
                hover:"image_2",
                value:"2",
                x:181,
                y:70,
                width:94,
                height:94

            },
            {
                default:"image_3_2",
                hover:"image_3",
                value:"3",
                x:285,
                y:70,
                width:94,
                height:94

            },
            {
                default:"image_4_2",
                hover:"image_4",
                value:"4",
                x:389,
                y:70,
                width:94,
                height:94

            },
            {
                default:"image_5_2",
                hover:"image_5",
                value:"5",
                x:493,
                y:70,
                width:94,
                height:94

            },
            {
                default:"image_del",
                hover:"image_del_hover",
                value:"del",
                x:637,
                y:70,
                width:176,
                height:95
            },
            {
                default:"image_6_2",
                hover:"image_6",
                value:"6",
                x:77,
                y:164,
                width:94,
                height:94

            },
            {
                default:"image_7_2",
                hover:"image_7",
                value:"7",
                x:181,
                y:164,
                width:94,
                height:94

            },
            {
                default:"image_8_2",
                hover:"image_8",
                value:"8",
                x:285,
                y:164,
                width:94,
                height:94

            },
            {
                default:"image_9_2",
                hover:"image_9",
                value:"9",
                x:389,
                y:164,
                width:94,
                height:94

            },
            {
                default:"image_0_2",
                hover:"image_0",
                value:"0",
                x:493,
                y:164,
                width:94,
                height:94
            },
            {
                default:"image_sure",
                hover:"image_sure_hover",
                value:"sure",
                x:637,
                y:164,
                width:176,
                height:95
            }
        ]
    }

    exec(){
        // console.log(stage,"预览");
        this.init(store.state.pageNumber);
    }

    init(pageNumber){
        let _that = this;
        // console.log(stage);
        this.pixiStage = stage.getChildByName('GAME').getChildByName('GAME'+pageNumber);
        RenderPageByIndex(pageNumber);
        this.gameBg = _that.pixiStage.children[0].children[0];
        // console.log(this.pixiStage);
        this.gameBg.removeChildren();
        let shelfPart1 = new PIXI.Sprite.fromImage(res['image_bg1'].url)
        shelfPart1.x = 0;
        shelfPart1.y = 0;
        let shelfPart2 = new PIXI.Sprite.fromImage(res['image_bg2'].url)
        shelfPart2.x = 1920;
        shelfPart2.y = 0;
        let shelfPart3 = new PIXI.Sprite.fromImage(res['image_bg3'].url)
        shelfPart3.x = 3840;
        shelfPart3.y = 0;
        let shelfPart4 = new PIXI.Sprite.fromImage(res['image_bg4'].url)
        shelfPart4.x = 5760;
        shelfPart4.y = 0;

        this.gameBg.addChild(shelfPart1)
        this.gameBg.addChild(shelfPart2)
        this.gameBg.addChild(shelfPart3)
        this.gameBg.addChild(shelfPart4)
        // console.log(this.gameBg)

        this.moveContainer = new Container();
        this.moveContainer.height = 1080;
        this.moveContainer.width = 5760;
        this.moveContainer.x = 1920;
        this.moveContainer.y = 0;
        this.pixiStage.addChild(this.moveContainer);

        this.yz = new PIXI.Sprite.fromImage(res['image_yz'].url);
        this.yz.x = 2800;
        this.yz.y = 300;

        this.yz_yy = new PIXI.Sprite.fromImage(res['image_yz_yy'].url);
        this.yz_yy.x = 2780;
        this.yz_yy.y = 540;

        this.yz_dog = getAnimation('animation_main'); //椅子狗
        this.yz_dog.state.setAnimation(1,'dog_wait',true);
        this.yz_dog.x = 3100;
        this.yz_dog.y = 550;
        this.yz_dog.width = 200;
        this.yz_dog.height = 200;

        this.ht_dog = getAnimation('animation_main');//花坛狗
        this.ht_dog.state.setAnimation(1,'dog_wait',true);
        this.ht_dog.scale.set(-1,1)
        this.ht_dog.x = 5400;
        this.ht_dog.y = 480;

        this.moveContainer.addChild(this.ht_dog);
        
        this.moveContainer.addChild(this.yz_yy);
        // console.log("椅子狗",this.yz_dog)
        this.moveContainer.addChild(this.yz_dog);
        this.moveContainer.addChild(this.yz);

        this.bike = new PIXI.Sprite.fromImage(res['image_bike'].url);
        this.bike.x = 700;
        this.bike.y = 300;
        this.moveContainer.addChild(this.bike);


        this.dog = getAnimation('animation_main'); //第一场狗和人进入
        this.mainAnimate = getAnimation('animation_main');


        this.pixiStage.addChild(this.dog);
        this.pixiStage.addChild(this.mainAnimate);

        this.mainAnimate.state.setAnimation(1,'xuduo_run',true);
        this.mainAnimate.x = 0;
        this.mainAnimate.y = 750;

        this.dog.state.setAnimation(1,'dog_run',true);
        this.dog.x = 0;
        this.dog.y = 640;
        
        this.initComment();//初始化标尺、题目、输入框
        this.initKeyboard(); //初始化键盘

        
        TweenLite.to(_that.dog,1,{x:920,onComplete:function(){
            _that.dog.state.setAnimation(1,'dog_wait',true);
        }});
      
        TweenLite.to(_that.mainAnimate,1,{x:280,onComplete:function(){
            _that.mainAnimate.state.setAnimation(1,'xuduo_wait1',true)
            _that.show();

        }});
 

    }

    show(){
        let _that = this;
        TweenLite.to(
            _that.comenContainer,
            .5,
            {
                alpha:1
            }

        );
        TweenLite.to(
            _that.keyContainer,
            .5,
            {
                y:840,
                alpha:1
            }
        )
    }

    hide(){
        let _that = this;
        TweenLite.to(    //键盘收起
            _that.keyContainer,
            .5,
            {
                alpha:0,
                y:1088
            }
        );
        TweenLite.to(  //标尺、题目收起
            _that.comenContainer,
            .5,
            {
                alpha:0
            }
        );
    }

    initComment(){
        let temContainer = new Container();
        this.comenContainer = temContainer;
        this.comenContainer.alpha = 0;
        this.biaochi = new PIXI.Sprite.fromImage(res[this.commentArr[this.num].biaochi_name].url); //标尺
        this.biaochi.x = parseInt(this.commentArr[this.num].biaochi_x);
        this.biaochi.y = parseInt(this.commentArr[this.num].biaochi_y);
        this.comenContainer.addChild(this.biaochi);

        this.title = new PIXI.Sprite.fromImage(res[this.commentArr[this.num].title_name].url); //题目
        this.title.x = 666;
        this.title.y = 700;
        this.comenContainer.addChild(this.title);

        this.input = new PIXI.Sprite.fromImage(res['image_input'].url); //输入框
        this.input.anchor.set(.5,.5)
        this.input.x = this.commentArr[this.num].input_x;
        this.input.y = this.commentArr[this.num].input_y;
        
        this.comenContainer.addChild(this.input);

        this.pixiStage.addChild(this.comenContainer);
    }

    initKeyboard(){
        let _that = this;
        let fillBlank = new PIXI.Text('',{fontFamily:"Arial",fontSize:50,fill:'#017b28',fontWeight:'900',align:'center'});
        fillBlank.anchor.set(.5,.5);
        fillBlank.x = this.input.x;
        fillBlank.y = this.input.y;


        this.pixiStage.addChild(fillBlank);


        let temContainer = new Container();
        this.keyContainer = temContainer;
        this.keyContainer.alpha = 0;
        temContainer.interactive = true;
        temContainer.x = 592;
        temContainer.y = 1088;

        this.keyboard = new PIXI.Sprite.fromImage(res['image_keybg'].url); //键盘背景
        this.keyboard.x = -15;
        this.keyboard.y = 0;
        temContainer.addChild(this.keyboard);
        

        this.pixiStage.addChild(temContainer);

        this.keyArr.map((item,index)=>{
            let temKey = new PIXI.Sprite.fromImage(res[item.hover].url);
            temKey.x = item.x;
            temKey.y = item.y;

            temKey.default = PIXI.Texture.fromImage(item.default);
            // temKey.clicked = PIXI.Texture.fromImage(item.hover);
            temKey.value = item.value;
            temKey.startWidth = item.width;
            temKey.startHeight = item.height;
    
            temKey.interactive = true;
            temKey.anchor.set(0.5,0.5)
            temKey.on('pointerover',function(){
                TweenLite.to(temKey,0.2,{width:temKey.width*1.1,height:temKey.height*1.1})
         
            })
            temKey.on('pointerout',function(){

                TweenLite.to(temKey,0.2,{width:temKey.startWidth,height:temKey.startHeight})
            
            })
            temKey.on('pointerdown',function(){
                res['audio_click'].sound.play();

                if(temKey.value!=='del' && temKey.value!=='sure'){
                    
                    if(fillBlank.text.length<3){
                        
                        fillBlank.text = fillBlank.text.trim().split(/\s+/);
                        fillBlank.text += (temKey.value);
                        
                    }else{
                        return;
                    }

                }else{

                    if(temKey.value=='del'){
                        if(fillBlank.text!==''){
                            fillBlank.text = fillBlank.text.substr(0,fillBlank.text.length-1)
                        }
                    }

                    if(temKey.value == 'sure'){ //提交本题答案信息
                        // console.log(fillBlank.text,question);
                        let AnswerMap = question.sources[_that.num].rightKey;
                        let userAnswerMap = [];
                        userAnswerMap.push(fillBlank.text);
                        let answer = new AnswerInfo();
                        let rightnum = 0;
                        let wrongnum = 1;
                        if(fillBlank.text == question.sources[_that.num].rightKey[0]){
                            rightnum++;
                            wrongnum--;
                        }
                        answer.init({type: 2, useranswer: userAnswerMap, answer: AnswerMap, id: _that.num, rightnum: rightnum, wrongnum: wrongnum});
                        store.dispatch('pushToPostArr', answer);
                        fillBlank.text = '';
                        
                        
                        if(_that.num<1){ //第一题

                            _that.hide();
                            _that.mainAnimate.state.setAnimation(1,'xuduo_run',true);//许多跑
                            _that.dog.state.setAnimation(1,'dog_run',true);     //小狗开始跑
                           
                            TweenLite.to(_that.gameBg,3,{   //背景移动
                                x:-1920*(_that.num+1),
                                onComplete:function(){
                                    _that.mainAnimate.state.setAnimation(1,'xuduo_wait1',true);

                               
                                    //显示标尺键盘
                                    _that.num++;
                                    // _that.stemAudioPause(0);
                                    _that.initComment();
                                    _that.initKeyboard();
                                    _that.show();
                                }
                            })
                            TweenLite.to(_that.moveContainer,3,{
                                x:0,onComplete:function(){
                                    
                                }
                            })

                            TweenLite.to(_that.dog,3,{x:2000,onComplete:function(){
                                _that.dog.alpha=0;                            
                            }})

                        }else{
                            if(_that.num == 1){ //第二题
                                // console.log("第三题开始");
                                
                                _that.hide();
                                _that.bike.alpha = 0;
                                _that.mainAnimate.state.setAnimation(1,'xuduo_bike1',false);
                                TweenLite.to(_that.mainAnimate,1,{
                                    x:500
                                })
                                setTimeout(()=>{
                                    TweenLite.to(_that.mainAnimate,1,{
                                        x:280
                                    })
                                    // _that.mainAnimate.x = 280;
                                    TweenLite.to(_that.moveContainer,5,{
                                        x:-(1920+220),
                                        onComplete:function(){
                                            // console.log('许多自行车')
                                            _that.mainAnimate.state.setAnimation(1,'xuduo_wait2',true)
                                        }
                                    })
                                    TweenLite.to(_that.gameBg,5,{   //背景移动
                                        x:-(1920*(_that.num+1)+220),
                                        
                                        onComplete:function(){
                                            _that.num++;
                                            // _that.stemAudioPause(0);
                                            _that.initComment();
                                            _that.initKeyboard();
                                            _that.show();
                                        }
                                    })

                                },1000)

                            }
                            if(_that.num == 2){ //第三题
                                // console.log("第四题开始");
                                _that.hide();
                                _that.yz_dog.state.setAnimation(1,'dog_run',true);
                                TweenLite.to(
                                    _that.yz_dog,
                                    3,
                                    {
                                        x:4150,
                                        onComplete:function(){
                                            _that.yz_dog.alpha = 0;
                                            _that.mainAnimate.state.setAnimation(1,'xuduo_bike2',false);
                                            TweenLite.to(
                                                _that.gameBg,
                                                3,
                                                {
                                                    x:-(1920*(_that.num+1)+270),
                                                    onComplete:function(){
                                                        _that.mainAnimate.state.setAnimation(1,'xuduo_wait2',true)
                                                    }
                                                }
                                            );
                                            TweenLite.to(
                                                _that.moveContainer,
                                                3,
                                                {
                                                    x:-(1920+220+1920+100),
                                                    onComplete:function(){
                                                        _that.num ++;
                                                        // _that.stemAudioPause(0);
                                                        _that.initComment();
                                                        _that.initKeyboard();
                                                        _that.show();
                                                        
                                                    }
                                                }
                                            )


                                        }
                                    }
                                )
                                

                            }

                            if(_that.num == 3){ //第四题
                                // console.log('这是第四题')
                                // console.log(_that.moveContainer);
                                _that.hide();
                                _that.ht_dog.alpha=0;
                                _that.mainAnimate.state.setAnimation(1,'xuduo_bike3',false);
                                setTimeout(()=>{

                                    store.dispatch('postAnswer');//提交答案
                                    console.log("数据================",store.state.postArr)
                                },3000)

                            }
                        }


                        // console.log(_that.pixiStage)
                    }
                }

            })
            temKey.on('pointerup',function(){
                // temKey.texture = temKey.default;
            })
            temContainer.addChild(temKey);
        })

    }
    stemAudioPause(index){
        let game = stage.getChildByName('GAME').getChildByName('GAME'+index);

        if(game.children[1].stemAudioStr){
            game.children[1].stemAudioStr.pause();
        }
        if(game.children[1].stemSound){
            game.children[1].stemSound.timeScale = 0;
        }
    }

}
export {Dog}