<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>ESASYS STATS</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <style>
    html {
      height: 100%;
      width: 100%;
      font-family: sans-serif;
    }

    body {
      overflow: hidden;
      height: 100%;
      width: 100%;
      margin: 0;
    }

    a {
      text-decoration: none;
    }

    .statistics {
      position: relative;
      display: block;
      height: 100vh;
      padding: 3.151vh;
      background-color: #1c4e57;
      background-image: url('images/back.png');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      /* padding-top: 0px!important; */
    }

    .statistic__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
      height: 5.252vh;
      margin-bottom: 2.111vh;
    }

    .statistic__title {
      color: #fff;
      font-size: 5vh;
      text-transform: uppercase;
      font-family: Verdana, serif;
      font-weight: bold;
      margin: 0;
    }

    .statistic__time {
      /* font-size: 3.3vh; */
      font-size: 5vh;
      color: #fff;
      font-family: Verdana, serif;
      font-weight: bold;
    }

    .statistic__time span:first-child {
      padding-right: 3.03vw;
      position: relative;
    }

    .statistic__time span:first-child:before {
      position: absolute;
      content: "|";
      display: block;
      color: rgba(255, 255, 255, .45);
      top: -0.127vw;
      right: 0.568vw;
    }

    .statistic__content {
      display: flex;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    .statistic__box {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      text-align: center;
      box-sizing: border-box;
      height: 27.311vh;
      width: 30.442vw;
      position: relative;
      background-color: #f7f7f7;
      margin: 0.465vw 0.465vw 0.465vw 1.526vw;
      padding-top: 4.252vh;
    }

    .statistic__box:before {
      position: absolute;
      display: block;
      content: " ";
      height: 100%;
      width: 1.061vw;
      background-color: rgba(255, 255, 255, .45);
      z-index: 0;
      top: 0px;
      left: -1.061vw;
    }

    .statistic__count {
      font-size: 15.08vh;
      line-height: 15.08vh;
      color: #000000;
      font-family: Verdana, serif;
      font-weight: bold;
      margin: 0;
      width: 100%;
    }

    .statistic__category {
      width: 100%;
      font-size: 3.846vh;
      line-height: 3.846vh;
      color: #000000;
      text-transform: uppercase;
      font-family: Verdana, serif;
      font-weight: bold;
      margin: 0;
      margin-top: -2.626vh;
    }

    .row {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      /*margin: 0px -0.465vw;*/
    }
  </style>
  <script src="js/vue.js"></script>
  <script src="js/axios.min.js"></script>
</head>

<body>
  <div id="statistics" class="statistics">
    <div class="statistic__header">
      <h1 class="statistic__title">Daily Statistics</h1>
      <div class="statistic__time" id="time"><span v-html="date"></span> <span v-html="time"></span></div>
    </div>
    <div class="statistic__content">
      <div class="row">
        <div class="statistic__box">

          <p class="statistic__count" v-html="customerServices" />
          <h2 class="statistic__category">Customer Services</h2>

        </div>
        <div class="statistic__box">

          <p class="statistic__count" v-html="pharmacist" />
          <h2 class="statistic__category">Pharmacists</h2>

        </div>
        <div class="statistic__box">

          <p class="statistic__count" v-html="dispensers" />
          <h2 class="statistic__category">Dispensers</h2>

        </div>
      </div>
      <div class="row">
        <div class="statistic__box">

          <p class="statistic__count" v-html="awaitingShipment" />
          <h2 class="statistic__category">Awaiting Shipment</h2>

        </div>
        <div class="statistic__box">

          <p class="statistic__count" v-html="shipped" />
          <h2 class="statistic__category">Shipped</h2>

        </div>
      </div>
      <div class="row">
        <div class="statistic__box">

          <p class="statistic__count" v-html="total" />
          <h2 class="statistic__category">Total</h2>

        </div>
      </div>
    </div>
  </div>

  <script type="module">
    const Statistics = {
      data() {
        return {
          date: '',
          time: '',
          interval: '',
          customerServices: 0,
          pharmacist: 0,
          dispensers: 0,
          awaitingShipment: 0,
          shipped: 0,
          total: 0,
        }
      },
      mounted() {
        this.startTime();
        this.getData();

        this.interval = setInterval(() => {
          this.getData();
        }, 5000);
      },
      unmounted() {
        clearInterval(this.interval);
      },
      methods: {
        getData() {
          axios.get(`/daily-stats/data`).then(r => {
            let data = r.data.data;

            this.total = data.total;
            this.dispensers = data.statistics.approved;
            this.pharmacist = data.statistics.new;
            this.customerServices = data.statistics.safety;
            this.awaitingShipment = data.statistics.awaiting;
            this.shipped = data.statistics.shipped;
          })
        },
        startTime() {
          let today = new Date();

          const daysNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];

          let day = daysNames[today.getDay()];
          let month = monthNames[today.getMonth()];
          let dd = String(today.getDate()).padStart(2, '0');
          let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          let yyyy = today.getFullYear();
          let date = `${day} ${dd} ${month} ${yyyy}`;

          if (date != this.date) {
            this.date = date;
          }

          let h = today.getHours();
          let m = today.getMinutes();
          let s = today.getSeconds();
          m = this.checkTime(m);
          s = this.checkTime(s);

          this.time = `${h}:${m}`;

          let t = setTimeout(this.startTime, 500);
        },
        checkTime(i) {
          if (i < 10) {
            i = "0" + i
          };
          return i;
        }
      },
    }
    Vue.createApp(Statistics).mount('#statistics');
  </script>

  <style>
    #confetti-canvas{
      position: fixed;
      top: 0;
    }
    
  </style>
</body>

</html>