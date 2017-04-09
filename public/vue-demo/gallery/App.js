const vm = new Vue({
  el: '#app',
  template: `
  <div id="container">
    <div id="navi">
      <div class="pageWrap"  v-bind:style="pagePosition">
        <div class="page">
          <ul>
            <li v-for="navi in navis1" @click="setSrc(navi)">
              <img v-bind:src="navi.thumb" v-bind:alt="navi.alt"></a>
            </li>
          </ul>
          <p><img src="images/btn_next.jpg" alt="次へ" class="next" @click="goNext(1)"></p>
        </div>
        <div  class="page">
          <ul>
            <li v-for="navi in navis2">
              <img v-bind:src="navi.thumb" v-bind:alt="navi.alt" @click="setSrc(navi)"></a>
            </li>
          </ul>
          <p><img src="images/btn_prev.jpg" alt="前へ" class="prev" @click="goPrev(2)"> <img src="images/btn_next.jpg" alt="次へ" class="next" @click="goNext(2)"></p>
        </div>
        <div  class="page">
          <ul>
            <li v-for="navi in navis3">
              <img v-bind:src="navi.thumb" v-bind:alt="navi.alt" @click="setSrc(navi)"></a>
            </li>
          </ul>
          <p><img src="images/btn_prev.jpg" alt="前へ" class="prev" @click="goPrev(3)"></p>
        </div>
      </div>
    </div>
    <div id="main">
        <img v-bind:src="mainSrc" alt="">
    </div>
  </div>
  `,
  data :{
      navis1:[
        {image:'images/photo1.jpg',thumb:'images/photo1_thum.jpg',alt:'シャンデリア'},
        {image:'images/photo2.jpg',thumb:'images/photo2_thum.jpg',alt:'バラ'},
        {image:'images/photo3.jpg',thumb:'images/photo3_thum.jpg',alt:'海'},
        {image:'images/photo4.jpg',thumb:'images/photo4_thum.jpg',alt:'門'},
        {image:'images/photo5.jpg',thumb:'images/photo5_thum.jpg',alt:'海'},
        {image:'images/photo6.jpg',thumb:'images/photo6_thum.jpg',alt:'あじさい'},
        {image:'images/photo7.jpg',thumb:'images/photo7_thum.jpg',alt:'空'},
        {image:'images/photo8.jpg',thumb:'images/photo8_thum.jpg',alt:'建物'}
      ],
      navis2:[
        {image:'images/photo9.jpg',thumb:'images/photo9_thum.jpg',alt:'手'},
        {image:'images/photo10.jpg',thumb:'images/photo10_thum.jpg',alt:'床'},
        {image:'images/photo11.jpg',thumb:'images/photo11_thum.jpg',alt:'木'},
        {image:'images/photo12.jpg',thumb:'images/photo12_thum.jpg',alt:'緑'},
        {image:'images/photo13.jpg',thumb:'images/photo13_thum.jpg',alt:'花'},
        {image:'images/photo14.jpg',thumb:'images/photo14_thum.jpg',alt:'くらげ'},
        {image:'images/photo15.jpg',thumb:'images/photo15_thum.jpg',alt:'風船'},
        {image:'images/photo16.jpg',thumb:'images/photo16_thum.jpg',alt:'花'}
      ],
      navis3:[
        {image:'images/photo17.jpg',thumb:'images/photo17_thum.jpg',alt:'花'},
        {image:'images/photo18.jpg',thumb:'images/photo18_thum.jpg',alt:'花'},
        {image:'images/photo19.jpg',thumb:'images/photo19_thum.jpg',alt:'花'},
      ],
      mainSrc:'images/photo1.jpg',
      pagePosition:'margin-left:0',
      page:[
        {key:1,position:'margin-left:0'},
        {key:2,position:'margin-left:-300px'},
        {key:3,position:'margin-left:-600px'}
      ]
  },
  methods:{
    setSrc(obj) {
      const mainImage = obj.image;
      this.mainSrc = mainImage;
    },
    goNext(number){
      let i = parseInt(number,10);
      this.pagePosition = this.page[i].position;
    },
    goPrev(number){
      let i = parseInt(number,10) - 2;
      this.pagePosition = this.page[i].position;
    }
  }
})
