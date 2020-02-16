<template>
    <div class="goods">
        <!-- 分类列表 -->
        <div class="menu-wrapper" ref="menuScroll">
            <ul>
                <!-- 专场 -->
                <li class="menu-item">
                    <p class="text">
                        <img class="icon" :src="container.tag_icon" v-if="container.tag_icon"  alt="">
                        {{container.tag_name}}
                    </p>
                </li>

                <li class="menu-item" v-for="(item,index) in goods" :key="index">
                    <p class="text">
                        <img class="icon" :src="item.icon" v-if="item.icon"  alt="">
                        {{item.name}}
                    </p>
                </li>
            </ul>
        </div>
        <!-- 商品列表 -->
        <div class="foods-wrapper" ref="foodScroll">
            <ul>
                <!-- 专场 -->
                <li class="container-list">
                    <div v-for="(item,index) in container.operation_source_list" :key="index">
                        <img :src="item.pic_url" alt="">
                    </div>
                </li>

                <!-- 具体分类 -->
                <li class="food-list" v-for="(item,index) in goods" :key="index">
                    <h3 class="title">{{item.name}}</h3>
                    <!-- 具体商品列表 -->
                    <ul>
                        <li class="food-item" v-for="(item,index) in item.spus" :key="index">
                            <div class="icon" :style="head_bg(item.picture)"></div>
                            <div class="content">
                                <h3 class="name">{{item.name}}</h3>
                                <p class="disc" v-if="item.description">{{item.description}}</p>
                                <div class="extra">
                                    <span class="saled">{{item.month_saled_content}}</span>
                                    <span class="saled">{{item.praise_content}}</span>
                                </div>
                                <img class="product" :src="item.product_label_picture" alt="">
                                <p class="price">
                                    <span class="text">&yen;{{item.min_price}}</span>
                                    <span class="unit">/{{item.unit}}</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
    data(){
        return{
            container:{},
            goods:[]
        }
    },
    methods:{
        head_bg(imgName){
            return "background-image:url(" + imgName + ");"
        },
        initScroll(){
            new BScroll(this.$refs.menuScroll)
            new BScroll(this.$refs.foodScroll)
        }
    },
    created(){
        //fetch
        fetch("/api/goods")
        .then(res => {
            return res.json()
        })
        .then(response => {
            if(response.code == 0){
            this.container = response.data.container_operation_source
            this.goods = response.data.food_spu_tags
            // console.log(this.container)
            // console.log(this.goods)
            
            //执行滚动方法
            this.initScroll()
            }
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goods{
    display: flex;
    position: absolute;
    top: 190px;
    bottom: 51px;
    overflow: hidden;
    width: 100%;
}
.goods .menu-wrapper{
    flex: 0 0 85px;
    background: #eeeeee;
}
.goods .foods-wrapper{
    flex: 1;
    background: #fcfcfc;
}
.goods .menu-wrapper .menu-item{
    padding: 16px 23px 15px 10px;
    border-bottom: 1px solid #E4E4E4;
}
.goods .menu-wrapper .menu-item .text{
    font-size: 13px;
    color: #333333;
    line-height: 17px;
    vertical-align: middle;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
}
.goods .menu-wrapper .menu-item .icon{
    width: 15px;
    height: 15px;
    vertical-align: middle;
}

/* 专场样式 */
.goods .foods-wrapper .container-list{
    padding: 11px 11px 0 11px;
    border-bottom: 1px solid #E4E4E4;
}
.goods .foods-wrapper .container-list img{
    width: 100%;
    margin-bottom: 11px;
    border-radius: 5px;
}
/* 分类下的商品布局 */
.goods .foods-wrapper .food-list{
	padding: 11px;
}
.goods .foods-wrapper .food-list .title{
	height: 13px;
	font-size: 13px;
	background: url(./img/btn_yellow_highlighted@2x.png) no-repeat left center;
	background-size: 2px 10px;
	padding-left: 7px;
	margin-bottom: 12px;
}
.goods .foods-wrapper .food-list .food-item{
	display: flex;
	margin-bottom: 25px;
  position: relative;
}
.goods .foods-wrapper .food-list .food-item  .icon{
	flex: 0 0 63px;
	background-position: center;
	background-size: 120% 100%;background-repeat: no-repeat;
	margin-right: 11px;
	height: 75px;
}
.goods .foods-wrapper .food-list .food-item .content{
	flex: 1;
}
/* 具体内容样式 */ 
.goods .foods-wrapper .food-list .food-item .content .name{
	font-size: 16px;
	line-height: 21px;
	color: #333333;
	margin-bottom: 10px;
	padding-right: 27px;
}

.goods .foods-wrapper .food-list .food-item .content .desc{
	font-size: 10px;
	line-height: 19px;
	color: #bfbfbf;
	margin-bottom: 8px;
	
	/* 超出部分显示省略号*/
	-webkit-line-clamp: 1;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.goods .foods-wrapper .food-list .food-item .content .extra{
	font-size: 10px;
	color: #BFBFBF;
	margin-bottom: 7px;
}
.goods .foods-wrapper .food-list .food-item .content .extra .saled{
	margin-right: 14px;
}
.goods .foods-wrapper .food-list .food-item .content .product{
	height: 15px;
	margin-bottom: 6px;
}
.goods .foods-wrapper .food-list .food-item .content .price{
	font-size: 0;
}
.goods .foods-wrapper .food-list .food-item .content .price .text{
	font-size: 14px;
	color: #fb4e44;
}
.goods .foods-wrapper .food-list .food-item .content .price .unit{
	font-size: 12px;
	color: #BFBFBF;
}

/* 当前选中 */ 
.goods .menu-wrapper .menu-item.current{
	background: white;
	font-weight: bold;
	margin-top: -1px;
}
.goods .menu-wrapper .menu-item:first-child.current{
	margin-top: 1px;
}

.goods .foods-wrapper .food-list .food-item .cartcontrol-wrapper{
	position: absolute;
	right: 0;
	bottom: 0;
}

.goods .menu-wrapper .menu-item .num{
	position: absolute;
	right: 5px;
	top: 5px;
	width: 13px;
	height: 13px;
	border-radius: 50%;
	color: white;
	background: red;
	text-align: center;
	font-size: 7px;
	line-height: 13px;
}

</style>
