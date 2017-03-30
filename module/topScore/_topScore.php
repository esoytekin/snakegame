<?php
function topScore()
{
   ?> 
    <div id="topScore" class="topScore thin-shadowed">
        <div id="topScoreHeader" class="thin-shadowed panelHeader animated">
           Top Scores 
         <a  href = "javascript://" id="btnRefreshTopScore" class="refresh-button"></a>
        </div>
        <div id="topScoreMain" class="topScoreTable">
        <table style="width:100%;">
        
        <tbody class="topScoreTable-body" id="topScoreTable-body">
        </tbody>
            
        </table>
        </div>
    </div>
    <?php
}
