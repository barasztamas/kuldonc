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

    <br/>Bárász Tamás
    <br/>S8JPUQ
    <br/>Webprogramozás esti, Js beadandó, Küldöncök
    <br/>2019-10-10
    <br/>Ezt a megoldást Bárász Tamás - S8JPUQ küldte be és készítette a Webprogramozás esti kurzus Js beadandó - Küldöncök feladatához.
    <br/>Kijelentem, hogy ez a megoldás a saját munkám.
    <br/>Nem másoltam vagy használtam harmadik féltől származó megoldásokat.
    <br/>Nem továbbítottam megoldást hallgatótársaimnak, és nem is tettem közzé.
    <br/>Az Eötvös Loránd Tudományegyetem Hallgatói Követelményrendszere (ELTE szervezeti és működési szabályzata, II. Kötet, 74/C. §) kimondja, hogy mindaddig, amíg egy hallgató egy másik hallgató munkáját - vagy legalábbis annak jelentős részét - saját munkájaként mutatja be, az fegyelmi vétségnek számít. A fegyelmi vétség legsúlyosabb következménye a hallgató elbocsátása az egyetemről.

    <script src="index.js" type="module"></script>
<?php require("partials/footer.php"); ?>