import './App.css';
import { useState } from 'react';
import * as XLSX from "xlsx";
import QRCode from 'react-qr-code'
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {

  const [items, setItems] = useState([]);


  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {


      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)

      fileReader.onload = (e) => {
        const bufferArry = e.target.result;

        const wb = XLSX.read(bufferArry, { type: 'buffer' })

        const wsname = wb.SheetNames[0]

        const ws = wb.Sheets[wsname]

        const data = XLSX.utils.sheet_to_json(ws)

        resolve(data)
      };

      fileReader.onerror = (error) => {
        reject(error)
      }

    })

    promise.then((d) => {

      setItems(d)

    })
  }

  return (

    <div>
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand"><b>ID card Generate Website</b></a>
          <label class="d-flex input-group w-auto">
            <b> RollNo Name Course Batch </b>
          </label>
        </div>
      </nav>

      <div>
        <form class="md-form">
          <div class="file-field" >
            <br />
            <div class="d-flex justify-content-center">
              <div class="btn btn-mdb-color btn-rounded float-left bg-success" >
                <span class="bg-success">Choose file</span>

                <input type="file" onChange={(e) => {
                  const file = e.target.files[0];
                  readExcel(file)
                }} />

              </div>
            </div>
          </div>
        </form>
      </div>
      <br />
      <br />
      {/* <br /> */}
      <table className="table container">

        <tbody>
          {items.map((d) => (

            // <tr key={d.Sno}>
            <div class="" >
              <div className="w-50  float-left" id="idcard">


                <div className="w-50 p-3 float-left " ><img src="https://www.saylaniwelfare.com/public_html/images/saylani/Saylani-logo.png" height="48px" width="" /> </div>
                <div className="w-50 p-3 float-right text-center" id="smitprogram">SAYLANI MASS<br />IT TRAINING PROGRAM</div>


                <div className="w-100 text-center" id="identity"><b>IDENTITY CARD</b> </div>

                <div class="w-75 h-50 float-left" >
                  {/* Width 45% */}
                  <ul class="list-group list-group-horizontal">
                    <li class="list-group-item" id="name">Roll No:</li>
                    <li class="list-group-item" id="namedetail">{d.RollNo}</li>
                  </ul>
                  <ul class="list-group list-group-horizontal">
                    <li class="list-group-item" id="name">Name:</li>
                    <li class="list-group-item" id="namedetail">{d.Name}</li>
                  </ul>
                  <ul class="list-group list-group-horizontal">
                    <li class="list-group-item" id="name">Course:</li>
                    <li class="list-group-item" id="namedetail">{d.Course}</li>
                  </ul>
                  <ul class="list-group list-group-horizontal">
                    <li class="list-group-item" id="name">Batch:</li>
                    <li class="list-group-item" id="namedetail">{d.Batch}</li>
                  </ul>
                </div>
                <div class="w-25 float-right text-center" id="photo" ><br /><br /><br /><b>Photo</b><br /><br /></div>

              </div>
              {/* Qrcode */}
              <div class="w-50 float-right" id="qr" >

                <div class="w-50 p-3 float-left " ><img src="https://www.saylaniwelfare.com/public_html/images/saylani/Saylani-logo.png" height="48px" width="" /> </div>
                <div class="w-50 p-3 float-right text-center" id="smitprogram">SAYLANI MASS<br />IT TRAINING PROGRAM</div>
                {/* <div class="w-50 p- float-right text-center" id="Smiit"><b>SMIT</b></div> */}


                <div class="w-100 text-center" id="Qrcode"><b>Roll No.: <u> {d.RollNo}</u></b> </div>
                {/* <QRCode id="abc" value={d.Qrcode} /> */}
                <div id="qrSize">
                  <div id="qrSizebox">
                    {<QRCode size="135" value={d.RollNo} />}
                  </div>


                </div>

              </div>
              c------
            </div>



          ))}
        </tbody>
      </table>



    </div>
  );
}

export default App;


