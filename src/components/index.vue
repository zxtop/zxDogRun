<template>
    <div class="container">
        <div class="canvas" ref="canvas"></div>
        <img src="static/images/logo.png" class="logo" id="logo"/>
    </div>
</template>

<script>
    import {Application, Container, Graphics, Sprite,Texture, ParticleContainer} from 'pixi.js';
    import {getAnimation, load, reateSprite} from '../loader';
    import START from "xes-preview-start";
    import STEMTITLE from 'xes-preview-subtitle';
    import GAME from "xes-preview-game";
    import AnimateClass from 'xes-animate'
    import {AnswerInfo,Loading,Question,postAnswer} from 'xes-answer';
    import {RenderAllData} from 'xes-tem-render'
    import {Dog} from './Dog.js'

    let question;
    let allData;
    export default {
        name: "start",
        data() {
            return {
                number: 0,
            }
        },
        methods: {
            createApp() {
                return new Application({
                    width: 1920,
                    height: 1080,
                    autoSize: true,
                    transparent: true //背景是否设为透明
                })
            },
        },
        created() {
            let loading = document.getElementsByClassName('page-loading')[0];
            loading.style.display = 'block';
        },
        destroyed() {
            PIXI.sound.stopAll();
            app.destroy();
        },
        mounted() {
            PIXI.sound.stopAll();
            let loading = document.getElementsByClassName('page-loading')[0];
            loading.style.display = 'block';
            window.app = this.createApp();
            app.view.style.width = '19.2rem';
            app.view.style.height = '10.8rem';
            app.view.id = 'appCanvas';
            window.stage = app.stage;
            const self = this;
            self.$refs.canvas.appendChild(app.view);
            stage.interactive = true;
            load().then(res => {
                console.log("%c资源加载完啦✌️", "color:#FF323B;font-weight:bold;");
                this.$nextTick(()=>{
                    window.question = res.question.data;
                    question = res.question.data;
                    allData = res.question.data;
                    // allData = this.allData;
                    store.state.testNum = res.question.data.sources.length;
                    console.log(this.allData)
                    let loading = document.getElementsByClassName('page-loading')[0];
                    loading.style.display = 'none';
                    if(this.$route.query.id==='undefined'||this.$route.query.id===undefined){
                        this.number = 0;
                    }else{
                        this.number = parseInt(this.$route.query.id);
                    }
                    // let game = new GAME(question.sources[this.number].bgImage, question.sources[this.number].stemImg, res);
                    // let stemTitle = new STEMTITLE(question.sources[this.number].subTitle, res);
                    let start = new START(question.one.start, res);
                    // game.addChild(stemTitle);
                    let runDog = new Dog();

                    //loading接口
                    Loading();
                    //初始化每题的答题数据
                    let answer = new AnswerInfo();
                    answer.answerDefault({type:2,useranswer:[]});
                    Question({id:'0',currentTotalOption:'1'})

                    RenderAllData(false,question);
                    if (!window.question.one.start.show) {
                        // stage.addChild(game);
                        // stage.setChildIndex(game,0);
                        runDog.exec();
                    } else {
                        if(this.$route.query.startStatus === 'true'||this.$route.query.startStatus === 'undefined'||this.$route.query.startStatus === undefined){
                            stage.addChild(start);
                            start.button(() => {
                                stage.removeChild(start);
                                // stage.addChild(game);
                                // stage.setChildIndex(game,0);
                                runDog.exec();
                            });
                        }else{
                            // stage.addChild(game);
                            // stage.setChildIndex(game,0);
                            runDog.exec();
                        }
                    }
                });
            })
        }
    }
</script>
<style scoped>
    .canvas {
        width: 19.2rem;
        height: 10.8rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -9.6rem;
        margin-top: -5.4rem;
    }
    canvas{

    }
    .logo {
        position: absolute;
        z-index: 999;
        left: .5rem;
        bottom: .3rem;
        width: 1.9rem;
    }
</style>