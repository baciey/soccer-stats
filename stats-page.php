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
  <div class="stats-page">
    <h1>Liga hiszpanska</h1>
    <h2>Wyniki <?php echo $_SESSION["selectedseason"]; ?></h2>
    <div class="container">
      <div class="table-container">
        <h2 class="chosen-team"></h2>
        <p class="team-name"><?php echo $_POST["team_name"]; ?> </p>
        <p style="display: none" class="team-id"><?php echo $_POST["team_id"]; ?> </p>
        <table class="stats-table">
          <thead>
          <tr>
            <th>#</th>
            <th>Rywal</th>
            <th>Home</th>
            <th>Away</th>
          </tr>
          </thead>
          <tbody>
            <?php foreach ($_SESSION["standings"]['data'] as $field => $value) { ?>
            <tr>
              <td><?php echo $value['position']; ?></td>
              <td class="team" id="<?php echo $value['team']['id'];?>">
                <form method="post" action="stats-page.php">
                  <input type="hidden" name="team_id" value="<?php echo $value['team']['id'];?>">
                  <input type="hidden" name="team_name" value="<?php echo $value['team']['name'];?>">
                  <input type="submit" name="team_submit" value="<?php echo $value['team']['name'];?>">
                </form>
              </td>
            </tr>
        <?php }

        ?>
          </tbody>
        </table>
      </div>
      </div>
      <script src="js/stats-page.js"></script>
      <script>
        let scores = <?php echo json_encode($_SESSION["results"], JSON_HEX_TAG); ?>;
        const id = <?php echo json_encode($_POST["team_id"], JSON_HEX_TAG); ?>;
        showGames(id);
      </script>
   </div>
  </body>
</html>