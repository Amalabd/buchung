
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link href="buchen.css" rel="stylesheet">
    <title>Buchung</title>
</head>
<body>

<!-- Navbar -->
<nav class="navbar navbar-light shadow naa">
    <div class="container-fluid">
        <div class="col">
            <img src="pic/logo2.png" alt="shap" width="55px">
            <span class="fs-3 fw-bold text-success">Buchung Seite</span>
        </div>
    </div>
</nav>

<div id="app">
    <div class="container sec shadow text-center mt-5 rounded" style="height: fit-content;">
    

        <!-- Personal Data Component -->

        <personal-com v-if="showCom" 
v-model:vor-name="vorName"
v-model:nach-name="nachName" 
></personal-com>
        <!-- Reservation Component (Dynamic Add / Remove) -->
        <div class="container text-center mt-5 " v-show="showCom">
      <div class="row m-3 align-items-center" style="justify-content: space-evenly;">
      <div class="col-2  ml-3" style="padding-right: 150px;">
        <h4></h4>
        </div>
        <div class="col-3 " style="padding-right: 100px;">
        <h4>Art</h4>
        </div>
        <div class="col-3 " style="padding-right: 110px;">
        <h4>Vom</h4>
        </div>
        <div class="col-3 " style="padding-right: 120px;">
        <h4>Bis</h4>
        </div>
        <div class="col-3 " style="padding-right: 120px;">
        <h4>Betrag</h4>
        </div>


      </div>
      </div>

        <div v-show="showCom" class=" m-2 col-10 align-items-center">
            <buchen-com 
    v-for="(line, index) in lines" 
    :key="index"
    :begin-date="line.beginDate"
    :end-date="line.endDate"
    :select="line.select"
    :line-total="lineTotals[index]"
    @update:begin-date="(value) => line.beginDate = value"
    @update:end-date="(value) => line.endDate = value"
    @update:days-difference="(value) => line.daysDifference = value"
    @update:select="(value) => line.select = value"
    @toggle-line="toggleComponents"
/>


        </div>

        <button @click="toRechnung" class="btn btn-success m-4 shadow" v-if="showCom">Rechnung &#10140;</button>
        <button onclick="location.reload()" class="btn btn-danger m-4 shadow" v-if="showCom">Reset Seite &orarr;</button>



        <!-- Reservation Summary -->
        <div v-if="showRechnung">
  <bill-com 
    :lines="lines" 
    :vor-name="vorName" 
    :nach-name="nachName" 
  />
</div>
<button @click="getBack" class="btn btn-success mt-3 mb-3 shadow" v-if="showRechnung" >
&#8617; Zurück</button>

    </div>
</div>

<script src="buchen.js"></script>

</body>
</html>
