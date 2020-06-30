<template>
  <div/>
</template>

<script>

export default {
  name: 'TrialIndex',
  data() {
    return {
      flag: false,
      flag2: false
    }
  },
  created() {
    this.draws()
  },
  methods: {
    draws() {
      // 当月数据
      var	thisMonth = [
        {
          'yearMon': '2019-08',
          'days': '5',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcount': 1,
          'pmoney': 59760
        },
        {
          'yearMon': '2019-08',
          'days': '13',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcount': 4,
          'pmoney': 753120
        },
        {
          'yearMon': '2019-08',
          'days': '14',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcount': 1,
          'pmoney': 351180
        },
        {
          'yearMon': '2019-08',
          'days': '16',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcount': 7,
          'pmoney': 957600
        },
        {
          'yearMon': '2019-08',
          'days': '19',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcount': 2,
          'pmoney': 1056240
        },
        {
          'yearMon': '2019-08',
          'days': '20',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcount': 7,
          'pmoney': 1852800
        },
        {
          'yearMon': '2019-08',
          'days': '21',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcount': 1,
          'pmoney': 670860
        },
        {
          'yearMon': '2019-08',
          'days': '22',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcount': 3,
          'pmoney': 1680240
        },
        {
          'yearMon': '2019-08',
          'days': '23',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcount': 3,
          'pmoney': 929880
        },
        {
          'yearMon': '2019-08',
          'days': '26',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcount': 16,
          'pmoney': 2661252
        },
        {
          'yearMon': '2019-08',
          'days': '27',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcount': 3,
          'pmoney': 823320
        },
        {
          'yearMon': '2019-08',
          'days': '28',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcount': 3,
          'pmoney': 891840
        },
        {
          'yearMon': '2019-08',
          'days': '29',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcount': 4,
          'pmoney': 685080
        },
        {
          'yearMon': '2019-08',
          'days': '30',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcount': 9,
          'pmoney': 1316160
        },
        {
          'yearMon': '2019-08',
          'days': '31',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcount': 47,
          'pmoney': 11118456
        }
      ]
      // 本月数据
      var	lastMonth = [
        {
          'yearMonLast': '2019-07',
          'daysLast': '5',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcountLast': 1,
          'pmoneyLast': 462600
        },
        {
          'yearMonLast': '2019-07',
          'daysLast': '10',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcountLast': 1,
          'pmoneyLast': 104400
        },
        {
          'yearMonLast': '2019-07',
          'daysLast': '11',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcountLast': 1,
          'pmoneyLast': 83040
        },
        {
          'yearMonLast': '2019-07',
          'daysLast': '15',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcountLast': 4,
          'pmoneyLast': 1305600
        },
        {
          'yearMonLast': '2019-07',
          'daysLast': '16',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcountLast': 2,
          'pmoneyLast': 217200
        },
        {
          'yearMonLast': '2019-07',
          'daysLast': '19',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcountLast': 5,
          'pmoneyLast': 1357680
        },
        {
          'yearMonLast': '2019-07',
          'daysLast': '22',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcountLast': 5,
          'pmoneyLast': 535680
        },
        {
          'yearMonLast': '2019-07',
          'daysLast': '23',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcountLast': 8,
          'pmoneyLast': 3068280
        },
        {
          'yearMonLast': '2019-07',
          'daysLast': '24',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcountLast': 3,
          'pmoneyLast': 1360200
        },
        {
          'yearMonLast': '2019-07',
          'daysLast': '26',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcountLast': 3,
          'pmoneyLast': 649356
        },
        {
          'yearMonLast': '2019-07',
          'daysLast': '29',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcountLast': 6,
          'pmoneyLast': 1593780
        },
        {
          'yearMonLast': '2019-07',
          'daysLast': '31',
          'orgAuto': null,
          'salesAuto': null,
          'fname': null,
          'pcountLast': 219,
          'pmoneyLast': 47951448
        }
      ]
      var taiNums = [] // 当月台数
      var money = [] // 当月金额
      var taiNumsLastMon = [] // 上个月台数
      var moneyLastMon = [] // 上个月金额
      var riqi = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

      for (var i = 0; i < riqi.length; i++) {
        this.flag = false
        this.flag2 = false
        var pcount
        var pmoney
        var pcount2
        var pmoney2
        // 当月
        for (var j = 0; j < thisMonth.length; j++) {
          // eslint-disable-next-line eqeqeq
          if (riqi[i] == thisMonth[j].days) {
            pcount = thisMonth[j].pcount
            pmoney = thisMonth[j].pmoney
            taiNums.push(thisMonth[j].pcount)
            money.push(thisMonth[j].pmoney)
            this.flag = true
          }
        }
        if (!this.flag) {
          // eslint-disable-next-line eqeqeq
          if (pcount == null || pmoney == null) {
            taiNums.push(0)
            money.push(0)
          } else {
            taiNums.push(pcount)
            money.push(pmoney)
          }
        }
        // 上个月
        for (var k = 0; k < lastMonth.length; k++) {
          // eslint-disable-next-line eqeqeq
          if (riqi[i] == lastMonth[k].daysLast) {
            pcount2 = lastMonth[k].pcountLast
            pmoney2 = lastMonth[k].pmoneyLast
            taiNumsLastMon.push(lastMonth[k].pcountLast)
            moneyLastMon.push(lastMonth[k].pmoneyLast)
            this.flag2 = true
          }
        }
        if (!this.flag2) {
          // eslint-disable-next-line eqeqeq
          if (pcount2 == null || pmoney2 == null) {
            taiNumsLastMon.push(0)
            moneyLastMon.push(0)
          } else {
            taiNumsLastMon.push(pcount2)
            moneyLastMon.push(pmoney2)
          }
        }
      }
      console.log('这是获取的pcount')
      console.log(taiNums)
      console.log('这是获取的pcountLast')
      console.log(taiNumsLastMon)
      console.log('这是获取的pmoney')
      console.log(money)
      console.log('这是获取的pmoneyLast')
      console.log(moneyLastMon)
    }
  }
}
</script>

<style scoped>

</style>
