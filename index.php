<?php
require_once("_init.php");
?>
<?php require("partials/header.php"); ?>
    
    <div id = "difficulty">
        <button id="easy"       class="difficulty"> Könnyű     </button>
        <button id="medium"     class="difficulty"> Közepes    </button>
        <button id="hard"       class="difficulty"> Nehéz      </button>
    </div>
    <div id="storage" hidden>
        <button id="save">          Mentés      </button>
        <button id="load">          Betöltés    </button>
    </div>
    <div id="checkSave" hidden>
        <br/>
        Van már mentett állás. Biztos felül akarod írni?
        <button id="overwrite">     Igen        </button>
        <button id="cancel">        Mégsem      </button>
        <br/>
        <div class="column right">
            Jelenlegi állás<br/>
            <table class="preview" id="actualPreview"></table>
        </div>
        <div class="column left">
            Mentett állás<br/>
            <table class="preview" id="savedPreview"></table>
        </div>
    </div>


    <div id="success" hidden><h3>Adj' Isten egészségére!</h3></div>

    <div>
        <table id="board"></table>
    </div>

    <script src="index.js" type="module"></script>
<?php require("partials/footer.php"); ?>