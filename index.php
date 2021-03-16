<?php
header('Cache-Control: no cache'); 
session_cache_limiter('private_no_expire'); 
// Start the session
session_start();
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="main.min.css" />
  </head>
  <body>
    <h1>Liga hiszpańska</h1>
    <div class="form-seasons">
    <form method="post" action="">
            Sezon: <select name="seasons" id="seasons" >
              <?php
                function get_seasons() {
                  $seasons = file_get_contents('json/seasons.json');
                  $seasons = json_decode($seasons, true);
                  $_SESSION["seasons"] = $seasons;
                }
                  get_seasons(); 
                  $last_season = count($_SESSION["seasons"]['data']) - 1;
                  $season = $_SESSION["seasons"]['data'][$last_season]['name'];
                  $_SESSION["lastseason"] = $season;
                  $_SESSION["selectedseason"] = '2020/2021';

                foreach ($_SESSION["seasons"]['data'] as $field => $value) { ?>
                  <option <?php 
                    if(isset($_POST['submit'])) {
                      if($_POST['seasons'] == $value['name']) {
                          echo 'selected';
                      }} else {
                            if($value['name'] == $_SESSION["lastseason"]){
                            echo 'selected'; 
                          }
                      } ?>
                    value="<?php echo $value['name'];?>"><?php echo $value['name'];
                  ?></option>

              <?php
              }
              ?>
            </select>
            <input type="submit" name="submit" value="Pokaż">
      </form>
    </div>
    <div class="container">
      <div class="menu">
        <span class="big-btn standings" onclick="renderCategory('standings');">Tabela Ligowa </span>
        <span class="big-btn calendar" onclick="renderCategory('calendar');">Terminarz </span>
      </div>
      <div class="standings section active ">
        <div class="buttons">
          <button class="standings main-btn active" onclick="showStandingsButtons();">tabela</button>
          <button class="over-under main-btn" onclick="showOverUnderButtons();">over/under</button>
          <button  class="halfs main-btn" onclick="showHalfsButtons();">połowy</button>
          <button  class="quarter main-btn" onclick="showQuartersButtons();">kwadranse</button>
        </div>
        <div class="navigation"></div>
        <?php
          function get_select_value() {
            $selected_season = isset($_POST['seasons']) ? $_POST['seasons'] : 'asd';
            $_SESSION["selectedseason"] = $selected_season;
          }
          if(isset($_POST['submit'])) {
            get_select_value();
            get_standings($_POST['seasons']);
            get_results($_POST['seasons']);
          } 
        ?>
        <div class="standings-table-wrapper">
          <table class="standings-table">
            <thead>
              <th>#</th>
              <th>Drużyna</th>
              <th class="played th-sort" >M</th>
              <th class="wins th-sort" >Z</th>
              <th class="draws th-sort" >R</th>
              <th class="losses th-sort" >P</th>
              <th class="points th-sort" >PKT</th>
            </thead>
            <tbody>
            <?php
            function get_standings($season) {
                if($season == '2018/2019') $standings = file_get_contents('json/standings2018-2019.json');
                else if($season == '2019/2020') $standings = file_get_contents('json/standings2019-2020.json');
                else if($season == '2020/2021') $standings = file_get_contents('json/standings2020-2021.json');
                $standings = json_decode($standings, true);
                $_SESSION["standings"] = $standings;
              }

              if(isset($_POST['submit'])) {null;}
              else {get_standings($_SESSION["lastseason"]); }

              foreach ($_SESSION["standings"]['data'] as $field => $value) { ?>
                <tr> 
                  <td><?php echo $value['position'] ?></td>
                  <td class="team">
                      <form method="post" action="stats-page.php">
                      <input type="hidden" name="team_id" value="<?php echo $value['team']['id'];?>">
                      <input type="hidden" name="team_name" value="<?php echo $value['team']['name'];?>">
                      <input type="submit" name="team_submit" value="<?php echo $value['team']['name'];?>">
                    </form>
                  </td>
                  <td><?php echo $value['played'];?></td>
                  <td><?php echo $value['wins'];?></td>
                  <td><?php echo $value['draws'];?></td>
                  <td><?php echo $value['losses'];?></td>
                  <td><?php echo $value['points'];?></td>
                </tr>
                <?php
                }
              ?>
            </tbody>
          </table>
        </div>
      </div>
      <div class="calendar section ">
        <h2>Ostatnie mecze </h2>
        <table class="results-table">
          <tbody>
          <?php 
          function get_results($season) {
            if($season == '2018/2019') $results = file_get_contents('json/results2018-2019.json');
            else if($season == '2019/2020') $results = file_get_contents('json/results2019-2020.json');
            else if($season == '2020/2021') $results = file_get_contents('json/results2020-2021.json');
            $results = json_decode($results, true);
            $_SESSION["results"] = $results;
          }

          if(isset($_POST['submit'])) {null;}
          else {get_results($_SESSION["lastseason"]); }  
             
              usort($_SESSION["results"]['data'],function($first,$second){
                $year1 = (int)substr($first['timestamp'], 0, 4);
                $month1 = (int)substr($first['timestamp'], 5, 2);
                $day1 = (int)substr($first['timestamp'], 8, 2);
                $hour1 = (int)substr($first['timestamp'], 11, 2);
                $minute1 = (int)substr($first['timestamp'], 14, 2);

                $year2 = (int)substr($second['timestamp'], 0, 4);
                $month2 = (int)substr($second['timestamp'], 5, 2);
                $day2 = (int)substr($second['timestamp'], 8, 2);
                $hour2 = (int)substr($second['timestamp'], 11, 2);
                $minute2 = (int)substr($second['timestamp'], 14, 2);

                if($year1 < $year2) return true;
                else if($year1 > $year2) return false;
                else {
                  if($month1 < $month2) return true;
                  else if($month1 > $month2) return false;
                  else {
                    if($day1 < $day2) return true;
                    else if($day1 > $day2) return false;
                    else {
                      if($hour1 < $hour2) return true;
                      else if($hour1 > $hour2) return false;
                      else {
                        if($minute1 < $minute2) return true;
                        else if($minute1 > $minute2) return false;
                      }
                    }
                  }

                }
              });
              
            ?>
            <form id="game_form" method="post" action="game-stats.php">
                  <input type="hidden" value="" id="game_id" name="game_id">
            </form>
            <script>
              function submitForm(id) {
                document.querySelector('input#game_id').value = id;
                document.querySelector('#game_form').submit();
              }
            </script>
              
            <?php
            
              $i = 0;
          foreach ($_SESSION["results"]['data'] as $field => $value) {if (++$i == 15) break;  ?>
                
              <tr onclick="submitForm(<?php echo $value['id'];?>);">
                <td><?php 
                  $value['timestamp'] = strtr($value['timestamp'], array('T' => ' '));
                  echo substr($value['timestamp'], 0, 16)?>
                </td>
                <td class="team"><form method="post" action="stats-page.php">
                  <input type="hidden" name="team_id" value="<?php echo $value['teams']['home']['id'];?>">
                  <input type="hidden" name="team_name" value="<?php echo $value['teams']['home']['name'];?>">
                  <input type="submit" name="team_submit" value="<?php echo $value['teams']['home']['name'];?>">
                </form></td>
                <td>
                  <span><?php echo $value['score'][0];?>:<?php echo $value['score'][1];?></span>
                  <span></span> 
                </td>
                <td class="team"><form method="post" action="stats-page.php">
                  <input type="hidden" name="team_id" value="<?php echo $value['teams']['away']['id'];?>">
                  <input type="hidden" name="team_name" value="<?php echo $value['teams']['away']['name'];?>">
                  <input type="submit" name="team_submit" value="<?php echo $value['teams']['away']['name'];?>">
                </form></td>
              </tr>
            <?php } ?>
          </tbody>
        </table>
      </div>
      </div>

   
    <script src="js/standings.js"></script>
    <script src="js/over-under.js"></script>
    <script src="js/global.js"></script>
    <script src="js/halfs.js"></script>
    <script src="js/quarters.js"></script>
    <script src="js/sort.js"></script>

    <script>
       let standings = <?php echo json_encode($_SESSION["standings"], JSON_HEX_TAG); ?>;
       let results = <?php echo json_encode($_SESSION["results"], JSON_HEX_TAG); ?>;
       let seasons = <?php echo json_encode($_SESSION["seasons"], JSON_HEX_TAG); ?>;
       let selectedseason = <?php echo json_encode($_SESSION["selectedseason"], JSON_HEX_TAG); ?>;
       
      showStandingsButtons();
    </script>


  </body>
</html>
