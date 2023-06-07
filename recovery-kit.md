| ![logo-ducati](file://srvdt01/workspace/condivisa/assets/logo-ducati.png) | PASSBOLT RECOVERY KIT    | Emissione: %DD/MM/YYYY% |
| ------------------------------------------------------------ | --------------------- | ----------------------- |
| M25 R00 01/07/2022                                           | %XXXXX_NOME_PROGETTO% | Revisione: %REV%        |

<style>
    .main {
        background: #7814;
        padding: 1px;
        height: 770px;
        margin:30px auto;
        border: 3px solid #2344;
        border-radius: 30px;
        width: 85%
    }
    h1 {
        font-family;
        text-align: center;
    }
    #containerTL{
        position: relative;
    }
    .logo{
        position: absolute;
        top: 0px;
        right: 40px;
    }
    h3 {
        text-align: center;
        padding-bottom: 20px;
    }
    label {
        font-size: 17px;
        font-style: ;
        display: block;
        margin-left: 10px;
    }
    input {
        width: 100%;
        height: 40px;
        border: 3px solid #3869;
        border-radius: 10px;
        display: block;
        font-size: 20px;
        padding-left: 5px;
    }
    form{
        background: #3813;
        padding: 20px 30px 20px;
        max-width:600px;
        max-height: 700px;
        margin:30px auto;
        border-radius: 20px;
        border:5px solid #3815;
    }
    .delbtn{
        text-align: center;
        margin-top:10px
    }
    button{
        display: inline-block;
        cursor: pointer;
        font-size: 14px;
        line-height: 1;
        border-radius: 500px;
        transition-duration: .3s;
        border: 1px solid transparent;
        letter-spacing: 2px;
        min-width: 100px;
        text-transform: uppercase;
        font-weight: 700;
        text-align: center;
        padding: 16px 14px 18px;
        color: #616467;
        box-shadow: inset 0 0 0 2px #616467;
        background-color: transparent;
        height: 48px;   
    }
    button:hover{
        color: #fff;
        background-color: #3818;
        }     
</style>

<div class="main">
    <div id="containerTL">
        <h1>Passbolt recovery kit</h1>
        <img src="https://avatars.githubusercontent.com/u/4386228?s=280&v=4" class="logo">
    </div>
    <div class="delform">
        <form>
            <h3>DETTAGLI ACCOUNT</h2>
            <div>
                <label for="link"><b>URL DI ACCESSO</label>
                <input type="url" name="link" value="https://srvpw01.centroricercheducati.com/"> <br>
                <label for="email">EMAIL</label> <input type="email" name="email"> <br>
                <label for="password">PASSPHRASE</label> <input type="password" name="password"> <br>
                <label for="chiave">CHIAVE PRIVATA PgP</b></label> <input type="text" name="chiave">
            </div>
            <div class="delbtn">
                <button>invia</button> 
            </div>
        </form>
    </div>
</div>
