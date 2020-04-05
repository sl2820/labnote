<template>
  <div class="analysis-view">
    <div class="inline-block text-xl font-black pr-2">
      Production Rate : Acetaminophen Synthesis
    </div>
    <div id="mygraph">
      <img src="http://kimhyunchul.kr/gr2.png" style="width:520px" /><br />
    </div>
    <div class="mylabel" style="top: 330px; left: 400px">
      Acetic anhydride
    </div>
    <div class="mylabel" style="top: 320px; left: 30px">
      4-Aminophenol
    </div>
    <hr />
    <table id="mytable">
      <thead>
        <th>Trial Number</th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
        <th>8</th>
        <th>9</th>
        <th>10</th>
        <th class="max">11</th>
        <th>12</th>
        <th>13</th>
        <th>14</th>
        <th>15</th>
      </thead>
      <tbody>
        <tr>
          <td class="label">Acetic anhydride</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1.5</td>
          <td>1.5</td>
          <td>1.5</td>
          <td>2</td>
          <td>2</td>
          <td>2</td>
          <td>2.5</td>
          <td class="max">2.5</td>
          <td>2.5</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
        </tr>
        <tr>
          <td class="label">4-Aminophenol</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>1</td>
          <td class="max">2</td>
          <td>3</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr id="production_rate">
          <td class="label">Production rate</td>
          <td>87.1</td>
          <td>81.9</td>
          <td>83.9</td>
          <td>71.3</td>
          <td>78.2</td>
          <td>74.0</td>
          <td>73.0</td>
          <td>72.9</td>
          <td>82.0</td>
          <td>84.8</td>
          <td class="max" style="border-radius: 0px 0px 5px 5px;">92.6</td>
          <td>89.4</td>
          <td>70.0</td>
          <td>71.5</td>
          <td>72.4</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script></script>

<style scoped>
.analysis-view {
  @apply relative flex flex-row my-32 mx-auto bg-white p-4 inset-0 text-left rounded shadow;
  width: 600px;
  height: 500px;
  min-height: 0%;
}

#mygraph {
  position: absolute;
  left: 50px;
  top: 50px;
}

#mytable {
  position: absolute;
  font-size: 12px;
  top: 400px;
  left: 25px;
}

.mylabel {
  position: absolute;
  font-size: 14px;
}

.max {
  background-color: rgb(53, 172, 247);
  color: white;
}

td,
th {
  padding-left: 5px;
  min-width: 30px;
}

th.max {
  border-radius: 5px 5px 0px 0px;
}
</style>
