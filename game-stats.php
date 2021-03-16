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
    <title>Team stats</title>
    <link rel="stylesheet" href="main.min.css" />
  </head>
  <body>
    <h1>Liga hiszpańska</h1>
    <h2>Statystyki Meczu</h2>
    <div class="game-stats">
    <div class="container">
      <div class="game-board">
        <div class="timestamp"></div>
        <div class="score"></div>
        <h3>Gole, kartki, zmiany</h3>
        <div class="events">
          <div class="home">
          </div>
          <div class="away"></div>
        </div>
        <h3>Skład</h3>
        <div class="players">
          <div class="home">
          </div>
          <div class="away"></div>
        </div>
      </div>
    </div>
    </div>
    <script>
      let results = <?php echo json_encode($_SESSION["results"], JSON_HEX_TAG); ?>;
      let gameId = <?php echo $_POST["game_id"]; ?>;
      // console.log(gameId);
      // console.log(results);

    </script>
    <script src="game-stats.js"></script>
    
  </body>
</html>