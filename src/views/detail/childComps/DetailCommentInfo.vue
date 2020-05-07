<template>
  <div v-if="Object.keys(commentInfo).length !== 0">
    <div class="comment-info">
      <div class="comment-top clear-fix">
        <div class="text">用户评论</div>
        <div class="more">
          <a href="">
            <span>更多</span>
            <i></i>
          </a>
        </div>
      </div>
      <div class="comment-bottom">
        <div class="u-ava">
          <img :src="commentInfo.user.avatar" alt="">
          <div class="u-name">{{commentInfo.user.uname}}</div>
        </div>
        <div class="content">{{commentInfo.content}}</div>
        <div class="created">
          <span class="date">{{commentInfo.created | showDate}}</span>
          <span>{{commentInfo.style}}</span>
        </div>
        <div class="comment-img">
          <img v-for="(item, index) in commentInfo.images" :key = "index" :src="item" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from "common/utils"

export default {
  props: {
    commentInfo: {
      type:Object,
      default() {
        return {}
      }
    }
  },
  data() {
   return {

   }
  },
  filters: {
    showDate(value) {
      // 1.将时间戳转化成Date对象
      let date = new Date(value*1000)

      // 2.将date进行格式化
      return formatDate(date, "yyyy-MM-dd hh:mm:ss")
    }
  },
  components: {

  }
}
</script>

<style scoped>
  .comment-info {
    padding: 30px 15px;
    border-bottom: 5px solid #f2f5f8;
    font-size: 14px;
  }

  .comment-top {
    height: 35px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  .comment-top .text{
    float:left;
  }

  .comment-top .more{
    float:right;
  }

  .more i {
    border-top: 2px solid rgba(0, 0, 0, .5);
    border-left: 2px solid rgba(0, 0, 0, .5);
    transform: rotate(135deg);
    display: inline-block;
    width: 10px;
    height: 10px;
  }

  .comment-bottom .u-ava {
    height:45px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    color: #222;
  }

  .comment-bottom .u-ava img{
    width: 42px;
    height: 42px;
    border-radius: 50%;
    margin-right: 5px;
  }

  .content {
    color:#777;
    margin: 12px 0;
  }

  .created {
    color: #999;
    font-size: 12px;
  }

  .created .date {
    margin-right: 8px;
  }

  .comment-img img {
    width: 80px;
    height: 80px;
    margin-right: 5px;
    margin-top: 8px;
  }
</style>
