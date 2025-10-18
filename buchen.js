const app = Vue.createApp({
  data() {
    return {
      count: 1,
      showCom: true,
      res: true,
      vorName: '',
      nachName: '',
      showRechnung: false,
      lines: [
        {
          beginDate: null,
          endDate: null,
          daysDifference: 0,
          select: '',
        }
      ]
    };
  },
  methods: {
    addLineAfter(index) {
      const newLine = {
        beginDate: null,
        endDate: null,
        daysDifference: 0,
        select: '',
      };
      this.lines.splice(index + 1, 0, newLine);
    },
    removeLineAt(index) {
      if (this.lines.length > 1) {
        this.lines.splice(index, 1);
      }
    },
    toRechnung() {
      this.showRechnung = !this.showRechnung;
      this.showCom = !this.showCom;
      console.log('showRechnung:', this.showRechnung); // Debug log
    },
    getBack() {
      this.showRechnung = !this.showRechnung;
      this.showCom = !this.showCom ; 
      console.log('showRechnung:', this.showRechnung); // Debug log
    }
    
  },
  computed: {
    lineTotals() {
      return this.lines.map(line => {
        if (line.daysDifference > 0) {
          return line.select == "Vollpension" 
          ? 160 * line.daysDifference 
          : 80 * line.daysDifference;
        }
        return 0;
      });
    }
  }
});


// Personal Information Component
app.component('personal-com', {
  props: ["vorName", "nachName"],
  emits: ["update:vor-name", "update:nach-name"],
  template: /*html*/
    `
    <div class="shadow pt-4 titl">
        <h1 class=" text-success">Machen Siee jetzt Ihre Buchung!!!!!!</h1>
    </div>

    <div class="input-group mt-4 container">
      <span class="input-group-text spn m-2 shadow rounded">Vor und Nach Name</span>

      <input
  type="text"
  :value="vorName"
  @input="$emit('update:vor-name', $event.target.value)"
  placeholder="Vorname"
  class="form-control m-2 shadow rounded"
  required
>
<input
  type="text"
  :value="nachName"
  @input="$emit('update:nach-name', $event.target.value)"
  placeholder="Nachname"
  class="form-control m-2 shadow rounded"
  required
>
 
    </div>
    <hr>

    `,

});

// Reservation Component
app.component('buchen-com', {
  props: ['beginDate', 'endDate', 'select', 'lineTotal', 'rowIndex'],
  emits: ['update:begin-date', 'update:end-date', 'update:select', 'update:days-difference', 'add-line', 'remove-line'],
  methods: {
    calculateDays() {
      if (this.beginDate && this.endDate) {
        const begin = new Date(this.beginDate).getTime();
        const end = new Date(this.endDate).getTime();
        const difference = end - begin;
        const days = difference >= 0 ? difference / 86400000 : 0;
        this.$emit('update:days-difference', days);
      }
    }
  },
  watch: {
    beginDate(newValue) {
      const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (newValue && new Date(newValue) < today) {
          alert('Begin date ungültig');
          this.$emit('update:begin-date', null);
        }else{
      this.calculateDays();
      this.$emit('update:begin-date', newValue);
        }
    },
    endDate(newValue) {
      const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (newValue && new Date(newValue) < today) {
          alert('End Datum ungültig');
          this.$emit('update:end-date', null);
        } else if (this.beginDate && new Date(newValue) <= new Date(this.beginDate)) {
          alert('End Datum soll nachdem Begin Datum sein');
          this.$emit('update:end-date', null);
      
      
        }else{
      this.calculateDays();
      this.$emit('update:end-date', newValue);}
    }
  },
  template: `
    <div class="container text-center ">
      <div class="row m-3 align-items-center">
      <div class="col-2">
        <button type="button" class="btn btn-sm btn-outline-success" @click="$emit('add-line', rowIndex)">
          <i class="fas fa-plus"></i>
        </button>
        <button type="button" class="btn btn-sm btn-outline-danger ms-2" @click="$emit('remove-line', rowIndex)">
          <i class="fas fa-minus"></i>
        </button>
      </div>

        <div class="col-3">
          <select :value="select" 
                  @change="$emit('update:select', $event.target.value)" 
                  class="form-select" required>
            <option value="" disabled selected> Wählen Sie hier aus!</option>
            <option value="Vollpension">Vollpension</option>
            <option value="Halbpension">Halbpension</option>
          </select>
        </div>
        <div class="col-3">
          <input type="date" 
                 :value="beginDate" 
                 @input="$emit('update:begin-date', $event.target.value)" 
                 class="form-control">
        </div>
        <div class="col-3">
          <input type="date" 
                 :value="endDate" 
                 @input="$emit('update:end-date', $event.target.value)" 
                 class="form-control">
        </div>
        <div class="col-3">
          <input type="text" class="form-control" readonly :value="lineTotal + ' €'">
        </div>
      </div>
    </div>
  `
});


// Bill Summary Component
app.component('bill-com', {
  props: ['vorName', 'nachName', 'lines'],
  computed: {
    totalAmount() {
      return this.lines.reduce((sum, line) => {
        if (line.daysDifference > 0) {
          return sum + (line.select == "Vollpension" ? 160 * line.daysDifference : 80 * line.daysDifference);
        }
        return sum;
      }, 0);
    }
  },
  template: /*html*/
    `
    <div>
      <div class="container text-center m-4">
        <h1 class="text-success">Rechnung &#9998;</h1>
      </div>
      <div class="container border rounded shadow p-3 mt-3">
        <div class="row m-3">
          <p><strong>Buchung unter Namen:</strong> <span class="txt fw-bold">{{ vorName }} {{ nachName }}</span></p>
        </div>
        <div class="container align-items-center m-3">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Art</th>
                <th scope="col">Begin Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Tagen</th>
                <th scope="col">Betrag</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(line, idx) in lines" :key="idx">
                <th>{{ idx + 1 }}</th>
                <td>{{ line.select }}</td>
                <td>{{ line.beginDate }}</td>
                <td>{{ line.endDate }}</td>
                <td>{{ line.daysDifference }}</td>
                <td>{{ (line.select == "Vollpension" ? 160 * line.daysDifference : 80 * line.daysDifference) }} €</td>
              </tr>
              <tr>
                <td colspan="2"><strong>Gesamtbetrag in €:</strong></td>
                <td colspan="4">{{ totalAmount }} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    `
});

app.mount('#app');
