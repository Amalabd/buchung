const app = Vue.createApp({
 
    data() {
      return {
        count: 0,
        showCom: true,
        vorName:'',
        nachName:'',
        beginDate:null,
        endDate:null,
        daysDifference: 0,
        invalidDate: false,
        select: '',
        
      }
    },
    methods: {
        toggleComponents(event) {
            if (event.target.checked) {
              this.count++;
            } else {
              this.count = Math.max(this.count - 1, 0);
            }
          },
        },
        computed: {
          total() {
            if (this.daysDifference > 0) {
              return this.select == 1
                ? 160 * this.daysDifference
                : 80 * this.daysDifference;
            }
            return 0;
          },
        },
  });
  // ----------- Component Personal Data ---------
  //===============================================

  app.component('personal-com', {
    props:["vorName", "nachName"],
    emits: ["update:vor-name", "update:nach-name"],
    data() {
      return {
        
      };
    },

    template: /*html*/
  `

    <div class="shadow pt-4 titl">
        <h1 class=" text-success">Machen Sie jetzt Ihre Buchung</h1>
    </div>

    <div class="input-group mt-4 container">
  <span class="input-group-text spn m-2">Vor und Nach Name</span>
  <input type="text" :value="vorName" 
  @input="$emit('update:vor-name', $event.target.value)" placeholder="Vorname" class="form-control m-2" required>
  <input type="text" :value="nachName" 
  @input="$emit('update:nach-name', $event.target.value)" placeholder="Nachname" class="form-control m-2" required><br>
  <p> name is: {{vorName}} {{nachName}}</p>
</div>
<hr>
<div class="container">
<div class="row txt">
    <h5 class="col-3 "></h5>
    <h5 class="col-7 ">Art</h5>

    <h5 class="col-10 ">Vom</h5>

    <h5 class="col-9  ">Bis</h5>
    <h5 class="col-10 ">Summe</h5>

</div>

</div>

  `

});
  // ---------Resrvation Data -------------
  //=========================================

  app.component('buchen-com', {
    props: ['beginDate', 'endDate', 'daysDifference', 'total', 'select'],
  emits: ['update:begin-date', 'update:end-date', 'update:days-difference', 'update:select'],
      data() {
      return {

        invalidDate: false,
        select: '',
      };
    },
    methods: {

      calculateDays() {
        if (this.beginDate && this.endDate) {
          const begin = new Date(this.beginDate).getTime();
          const end = new Date(this.endDate).getTime();
          const difference = end - begin;
          this.$emit('update:days-difference', difference >= 0 ? difference / 86400000 : 0);
        } else {
          this.$emit('update:days-difference', 0);
        }
      },
        },

    watch: {
      beginDate(newBeginDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (newBeginDate && new Date(newBeginDate) < today) {
          alert('Begin date ungültig');
          this.$emit('update:begin-date', null);
        }
      },
      endDate(newEndDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (newEndDate && new Date(newEndDate) < today) {
          alert('End date ungültig');
          this.$emit('update:end-date', null);
        } else if (this.beginDate && new Date(newEndDate) < new Date(this.beginDate)) {
          alert('End date cannot be before begin date');
          this.$emit('update:end-date', null);
        }
      },
      },
    
    
    
    template: /*html*/
    `
    <div class="container text-center">
      <div class="row m-3 align-items-center">
        <div class="col-3">
          <select v-model="select" @change="$emit('update:select', select)" class="form-select">
            <option value="" disabled selected>Wählen Sie hier aus!</option>
            <option value="1">Vollpension</option>
            <option value="2">Halbpension</option>
          </select>
        </div>

        <div class="col-3">
          <input type="date" 
                 :value="beginDate" 
                 @input="$emit('update:begin-date', $event.target.value)" 
                 @change="calculateDays" 
                 class="form-control">
        </div>

        <div class="col-3">
          <input type="date" 
                 :value="endDate" 
                 @input="$emit('update:end-date', $event.target.value)" 
                 @change="calculateDays" 
                 class="form-control">
        </div>

        <div class="col-3">
          <input type="text" class="form-control" readonly :value="total + ' €'">
        </div>
      </div>
    </div>
       

    `
  });

   // ---------The Bill -------------
  //=========================================

  app.component('bill-com', {
    props: ['beginDate', 'endDate', 'daysDifference', 'total', 'vorName', 'nachName'],

    data() {
      return {

      };
    },


    template: /*html*/
    `
    <div class="container align-items-center border">
      <div class=" col-12 border">
            <h3>Reservation Summary</h3>
      </div>

      <div class=" m-3 align-items-center border">

      <p><strong>VorName:</strong> {{ vorName }}</p>
      <p><strong>Nach Name:</strong> {{ nachName }}</p>
      <p><strong>Begin Date:</strong> {{ beginDate }}</p>
      <p><strong>End Date:</strong> {{ endDate }}</p>
      <p><strong>Number of Days:</strong> {{ daysDifference }}</p>
      <p><strong>Total Price:</strong> {{ total }} €</p>
    </div>

  </div>
       

    `
});
  app.mount('#app');