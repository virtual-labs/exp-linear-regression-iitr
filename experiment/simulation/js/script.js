const myContainer = document.getElementById('box');

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var modalBtn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var closeBtn = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
modalBtn.addEventListener("click", function () {
    modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});


// When the user clicks anywhere outside of the modal, close it
            window.addEventListener('click', function (event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            });


// When the user clicks anywhere outside of the modal content, do not close it
window.onclick = function(event) {
    if (event.target == modal) {
      // Check if the clicked element is the modal itself
      modal.style.display = "none";
    } else if (event.target.closest(".swal2-container")) {
      // Check if the clicked element is inside the SweetAlert2 modal
      event.stopPropagation();
    }
};

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);


function alerts(icon,message,title)
{
  Swal.fire({
    icon: icon,
    html: message,
    title: title,
    customClass: {
      container: 'position-absolute',
      popup: 'swal2-popup',
      title: 'swal2-title',
      content: 'swal2-content',
    },
    target: document.getElementById('tableId'),
    didOpen: () => {
      const container = document.querySelector('.position-absolute');
      const containerWidth = document.getElementById('tableId').offsetWidth;
      const containerHeight = document.getElementById('tableId').offsetHeight;

      // Change font size based on container size
      if (containerWidth >= 400 && containerHeight >= 300) {
        container.style.fontSize = '24px';
      } else {
        container.style.fontSize = '16px';
      }

      // Adjust dimensions and position of the Swal container
      container.style.position = 'absolute';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.top = '0';
      container.style.left = '0';
      container.style.padding = '0';
    },
  });
}

var data = [['X', 'Y']];
var deleteButtons = [];


var values = [];
function addDataPoint() {
    var xValue = parseInt(document.getElementById('X').value);
    var yValue = parseInt(document.getElementById('Y').value);
    
    // Check if the values already exist in the array
    var duplicateValues = values.filter(function(value) {
        return value[0] === xValue && value[1] === yValue;
    });

    if (duplicateValues.length > 0) {
      alerts('error','Please enter unique values for X and Y.', 'Duplicate Values!' );
        return;
    }

    if (isNaN(xValue) && isNaN(yValue)) {
      alerts('info','Please enter positive values for X and Y.', 'Missing Values!' );    
      return;
  }

  if (isNaN(xValue)) {
      alerts('info','Please enter a value for X between 1 and 100.', 'Missing Value!' );
      return;
  }

  if (isNaN(yValue)) {
      alerts('info','Please enter a value for Y between 60 and 130.', 'Missing Value!' );
      return;
  }

    if (xValue < 1 || xValue > 100) {
    alerts('error','Age should be between 1 and 100.', 'Invalid Value!' );
      return;
    }

     if (yValue < 60 || yValue > 130) {
      alerts('error','Glucose level should be between 60 and 130.', 'Invalid Value!' );
      return;
    }

  // Add values to the array
  values.push([xValue, yValue]);
    data.push([roundToTwoDecimalPlaces(Number(xValue)), roundToTwoDecimalPlaces(Number(yValue))]);

    drawChart();
    updateTable();
var resbutton=document.getElementById('resets')
if(resbutton.disabled==true)
{
  resbutton.disabled=false;
}
 
document.getElementById('X').value = "";
document.getElementById('Y').value = "";


    if (data.length >= 11) {
        disableAddButton();
        promptToDeleteRow();
    }
}

function deleteRow(button) {
    var row = button.parentNode.parentNode;
    var index = row.rowIndex;
    data.splice(index, 1);
    deleteButtons.splice(index - 1, 1);

    drawChart();
    updateTable();

    if (data.length >= 11) {
        enableAddButton();
        disableDeleteButtons();
      
    }
    if (data.length <= 11) {
     
        disableNextButton();
    }

}

function promptToDeleteRow() {

    Swal.fire({
      
        text: 'Do you want to delete any row?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
            container: "position-absolute",
            popup: "swal2-popup",
            title: "swal2-title",
            content: "swal2-content",
        },
        target: myContainer,
        didOpen: () => {
            const container = document.querySelector('.position-absolute');
            const containerWidth = myContainer.offsetWidth;
            const containerHeight = myContainer.offsetHeight;

            // Change font size based on container size
            if (containerWidth >= 1000 && containerHeight >= 672) {
                container.style.fontSize = '24px';
            } else {
                container.style.fontSize = '16px';
            }

            // Adjust dimensions and position of the Swal container
            container.style.position = 'absolute';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.top = '0';
            container.style.left = '0';
            container.style.padding = '0';
        },
        showCloseButton: false,  // Disable the close button
        allowOutsideClick: false, // Prevent closing by clicking outside the modal
        allowEscapeKey: false // Prevent closing by pressing the escape key
    }).then((result) => {
        if (result.isConfirmed || result.isDenied) {
            enableNextButton();
            enableDeleteButtons();
        
        } else {
            disableAddButton();
            disableDeleteButtons();
            enableNextButton();
            Swal.fire({
                icon: 'info',
                // title: 'Please enter valid numeric values for X and Y.',
                html: 'Click on the <b style="color: #FF6600">NEXT</b> Button.',
                customClass: {
                    container: "position-absolute",
                    popup: "swal2-popup",
                    title: "swal2-title",
                    content: "swal2-content",
                },
                target: myContainer,
                didOpen: () => {
                    const container = document.querySelector('.position-absolute');
                    const containerWidth = myContainer.offsetWidth;
                    const containerHeight = myContainer.offsetHeight;

                    // Change font size based on container size
                    if (containerWidth >= 1000 && containerHeight >= 672) {
                        container.style.fontSize = '24px';
                    } else {
                        container.style.fontSize = '16px';
                    }

                    // Adjust dimensions and position of the Swal container
                    container.style.position = 'absolute';
                    container.style.width = '100%';
                    container.style.height = '100%';
                    container.style.top = '0';
                    container.style.left = '0';
                    container.style.padding = '0';
                },
            });
        }
    });

}

function enableAddButton() {
    document.getElementById('add-button').disabled = false;
}
function enableAddButtonAfterYes() {
    document.getElementById('add-button').disabled = false;
}

function disableAddButton() {
    document.getElementById('add-button').disabled = true;
}

function enableNextButton() {
    document.getElementById('next-button').disabled = false;
}
disableNextButton();
function disableNextButton() {
    document.getElementById('next-button').disabled = true;
}

// cluster next button
disableClusterNextButtons();
function disableClusterNextButtons() {
    document.getElementById("compute-b-next-button").disabled = true;
}
function enableClusterNextButtons() {
    document.getElementById("compute-b-next-button").disabled = false;
}


function enableDeleteButtons() {
    deleteButtons.forEach(function (button) {
        button.disabled = false;
    });

}

function disableDeleteButtons() {
    deleteButtons.forEach(function (button) {
        button.disabled = true;
    });
}


function drawChart() {
    // Convert data to the correct format
    var formattedData = [];
    formattedData.push(['X', 'Y']); // Initialize data array with header row

    for (var i = 1; i < data.length; i++) {
        var xValue = Number(data[i][0]);
        var yValue = Number(data[i][1]);
        formattedData.push([xValue, yValue]);
    }

    var chartData = google.visualization.arrayToDataTable(formattedData);

    var options = {
        titleTextStyle: { fontSize: 19 }, // Increase the font size of the title
        title: '', // Add the main title for the graph
        legend: { position: 'none' },
        hAxis: {
            titleTextStyle: { fontSize: 15 },
            title: 'AGE (yrs)',
            minValue: 0
        },
        vAxis: {titleTextStyle: { fontSize: 18 },
            title: 'GLUCOSE-LEVEL (mg/dL) ',
            minValue: 0
        },
        chartArea: { width: '80%', height: '80%' } // Added to adjust the chart area size
    };



    var chart = new google.visualization.ScatterChart(document.getElementById('chart-container'));
    chart.draw(chartData, options);

    var GraphContainer = document.getElementById('chart-container');
    google.visualization.errors.removeAll(GraphContainer);
}


function updateTable() {
    var table = document.getElementById('data-table');

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    if (table.rows.length < 10) {
        enableAddButton();
    }

    deleteButtons = [];

    for (var i = 1; i < data.length; i++) {
        var row = table.insertRow(i);
        var sCell = row.insertCell(0);
        var xCell = row.insertCell(1);
        var yCell = row.insertCell(2);
        var deleteCell = row.insertCell(3);

        sCell.innerHTML = `${i}`;
        xCell.innerHTML = data[i][0];
        yCell.innerHTML = data[i][1];

        var deleteButton = document.createElement('input');
        deleteButton.type = 'button';
        deleteButton.value = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function () { deleteRow(this); };

        deleteCell.appendChild(deleteButton);
        deleteButtons.push(deleteButton);
    }
}


function disableDeleteButton() {
    for (let index = 0; index < 10; index++) {
        document.getElementsByClassName('delete-button')[index].disabled = true;
    }
}

// roundToTwoDecimalPlaces
function roundToTwoDecimalPlaces(number) {
    return Math.round(number * 100) / 100;
}


// Hide the delete column and delete heading in the data-table
function deleteHidden() {
    var table = document.getElementById('data-table');
    var rows = table.rows;

    // Iterate through each row (excluding the control panel row)
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].cells;

        // Remove the delete cell (assuming it is the last cell in each row)
        if (cells.length > 0) {
            var lastCellIndex = cells.length - 1;
            var lastCell = cells[lastCellIndex];
            lastCell.style.display = 'none';
        }
    }
    
}

// Handle next-button click event
document.getElementById('next-button').addEventListener('click', function () {
    var table = document.getElementById('data-table');
    var rows = table.rows;

    // Iterate through each row (excluding the control panel row)
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].cells;

        // Remove the delete cell (assuming it is the last cell in each row)
        if (cells.length > 0) {
            var lastCellIndex = cells.length - 1;
            var lastCell = cells[lastCellIndex];

            // Remove the delete button from the row
            var deleteButton = lastCell.querySelector('.delete-button');
            if (deleteButton) {
                deleteButton.remove();
            }
        }

        // Remove extra cells from the row
        while (cells.length > 3) {
            cells[3].parentNode.removeChild(cells[3]);
        }
    }

        // Remove the delete heading from the table header row
        var headerRow = table.rows[0];
        var headerCells = headerRow.cells;
        if (headerCells.length > 0) {
            var deleteHeadingIndex = -1;
    
            // Find the index of the delete heading
            for (var j = 0; j < headerCells.length; j++) {
                if (headerCells[j].textContent.trim().toLowerCase() === 'delete') {
                    deleteHeadingIndex = j;
                    break;
                }
            }
    
            // Remove the delete heading cell
            if (deleteHeadingIndex !== -1) {
                headerRow.deleteCell(deleteHeadingIndex);
            }
        }
    
});

// Handle cluster-submit-button click event
document.getElementById('cluster-submit-button').addEventListener('click', function () {
    var table = document.getElementById('data-table');
    var rows = table.rows;

    // Iterate through each row (excluding the control panel row)
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].cells;

        // Remove the delete cell (assuming it is the last cell in each row)
        if (cells.length > 0) {
            var lastCellIndex = cells.length - 1;
            var lastCell = cells[lastCellIndex];

            // Remove the delete option from the row
            var deleteOption = lastCell.querySelector('.delete-option');
            if (deleteOption) {
                deleteOption.remove();
            }
        }

        // Remove extra cells from the row
        while (cells.length > 3) {
            cells[3].parentNode.removeChild(cells[3]);
        }
    }

        // Remove the delete heading from the table header row
        var headerRow = table.rows[0];
        var headerCells = headerRow.cells;
        if (headerCells.length > 0) {
            var deleteHeadingIndex = -1;
    
            // Find the index of the delete heading
            for (var j = 0; j < headerCells.length; j++) {
                if (headerCells[j].textContent.trim().toLowerCase() === 'delete') {
                    deleteHeadingIndex = j;
                    break;
                }
            }
    
            // Remove the delete heading cell
            if (deleteHeadingIndex !== -1) {
                headerRow.deleteCell(deleteHeadingIndex);
            }
        }
    
});

document.getElementById("next-button").addEventListener("click",
    function computeIsOn() {
       
        DisplayClusterButtonSection();
        DisplayClusterSection();
        NoneDataButtonSection();
        NoneDataSection();
    }
);


document.getElementById("compute-b-next-button").addEventListener("click", function() {
    // Hide the NonTableSection (if needed)
    let NonTableSection = document.getElementById("non-table-section");
    NonTableSection.style.display = "none";
  
    // Hide the ClusterButtonSection
    NoneClusterButtonSection();
  
    // Hide the ClusterSection
    NoneClusterSection();
  
    // Hide the DataButtonSection
    NoneDataButtonSection();
  
    // Hide the DataSection
    NoneDataSection();
  
    // Show the ComputeSection
    DisplayComputeSection();
  });



// cluster control panal
function NoneClusterSection() {
    let NoneClusterSection = document.getElementById("cluster-control");
    NoneClusterSection.style.display = "none";
}

function DisplayClusterSection() {
    let NoneClusterSection = document.getElementById("cluster-control");
    NoneClusterSection.style.display = "block";
}

function DisplayDataSection() {
    let DisplayDataSection = document.getElementById("training-control");
    DisplayDataSection.style.display = "block";
}
function NoneDataSection() {
    let NoneDataSection = document.getElementById("training-control");
    NoneDataSection.style.display = "none";
}
function NoneDataButtonSection() {
    let NoneDataButtonSection = document.getElementById("data-button-container");
    NoneDataButtonSection.style.display = "none";
}
function DisplayDataButtonSection() {
    let DisplayDataButtonSection = document.getElementById("data-button-container");
    DisplayDataButtonSection.style.display = "block";
}
function NoneClusterButtonSection() {
    let NoneClusterButtonSection = document.getElementById("cluster-button-container");
    NoneClusterButtonSection.style.display = "none";
}
function DisplayClusterButtonSection() {
    let DisplayClusterButtonSection = document.getElementById("cluster-button-container");
    DisplayClusterButtonSection.style.display = "block";
}

// table section none and display
function NoneTableSection() {
    let NoneTableSection = document.getElementById("tableId");
    NoneTableSection.style.display = "none";
}
function DisplayTableSection() {
    let DisplayTableSection = document.getElementById("tableId");
    DisplayTableSection.style.display = "block";
}
// graph section none and display
function NoneGraphSection() {
    let NoneGraphSection = document.getElementById("graphId");
    NoneGraphSection.style.display = "none";
}
function DisplayGraphSection() {
    let DisplayGraphSection = document.getElementById("graphId");
    DisplayGraphSection.style.display = "block";
}
// trainingSection section none and display

// ComputeSection section none and display
NoneComputeSection(); 
function NoneComputeSection() {
    let NoneComputeSection = document.getElementById("ComputeSection");
    NoneComputeSection.style.display = "none";
}
function DisplayComputeSection() {
    let DisplayComputeSection = document.getElementById("ComputeSection");
    DisplayComputeSection.style.display = "block";
    x=document.getElementById('x-test-data').innerHTML='x = '+xValueTest+' (test data)';
}


NoneClusterButtonSection();
NoneClusterSection();


var data = [['X', 'Y']];
var deleteButtons = [];




var  xValueTest;

function submitCluster() {



  var xInput = document.getElementById('age');
  xValueTest = xInput.value.trim();


  if (xValueTest === '') {
    alerts('error','Please enter a value for X between 1 and 100.', 'Missing Value!!');
    return;
  }
  
  if (xValueTest < 1 || xValueTest > 100) {
    alerts('error','Age should be between 1 and 100.', 'Invalid Value!');
    return;
}


  // Add value to observation table
  var observationTable = document.getElementById('data-table');
  var newRow = observationTable.insertRow(-1);
  var serialNumber = observationTable.rows.length - 1;
  var sNoCell = newRow.insertCell(0);
  var xCell = newRow.insertCell(1);
  var yCell = newRow.insertCell(2);

  sNoCell.innerHTML = serialNumber;
  xCell.innerHTML =  xValueTest;

  // Check if it's the 11th row
if (serialNumber === 11) {
    yCell.innerHTML = '?';
    newRow.classList.add('highlight-yellow');
    disableAddButton();
    enableNextButton();
    disableClusterSubmitButton();
    enableClusterNextButton();
    showSwalAlert('info', 'Please click on <b style="color: #FF6600">NEXT</b> to determine the value of <strong>Y</strong>(Glucose-level) for the given <strong>X</strong>(age)');
    document.getElementById('resetbut').disabled=false;
  } else {
    yCell.innerHTML = '?';
  }
  
  // Add the data to the data array
  data.push([ xValueTest, null]);

  console.log(data);
  xInput.value = ''; // Clear input value after submission

}


function disableAddButton() {
  var addButton = document.getElementById('add-button');
  addButton.disabled = true;
}

function enableNextButton() {
  var nextButton = document.getElementById('next-button');
  nextButton.disabled = false;
}

function disableClusterSubmitButton() {
  var clusterSubmitButton = document.getElementById('cluster-submit-button');
  clusterSubmitButton.disabled = true;
}

function enableClusterNextButton() {
  var clusterNextButton = document.getElementById('compute-b-next-button');
  clusterNextButton.disabled = false;
}

  
function showSwalAlert(icon, message) {
  Swal.fire({
    icon: icon,
    html: message,
    customClass: {
      container: 'position-absolute',
      popup: 'swal2-popup',
      title: 'swal2-title',
      content: 'swal2-content',
    },
    target: document.getElementById('tableId'),
    didOpen: () => {
      const container = document.querySelector('.position-absolute');
      const containerWidth = document.getElementById('tableId').offsetWidth;
      const containerHeight = document.getElementById('tableId').offsetHeight;

      // Change font size based on container size
      if (containerWidth >= 1000 && containerHeight >= 672) {
        container.style.fontSize = '24px';
      } else {
        container.style.fontSize = '16px';
      }

      // Adjust dimensions and position of the Swal container
      container.style.position = 'absolute';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.top = '0';
      container.style.left = '0';
      container.style.padding = '0';
    },
  });
}

  function resetEleventhRow() {
    // Get the observation table
    var observationTable = document.getElementById('data-table');
  
    // Check if the 11th row exists
    if (observationTable.rows.length > 11) {
      // Remove the 11th row
      observationTable.deleteRow(11);
  
      // Enable the "Add" button
      document.getElementById('cluster-submit-button').disabled = false;
  
      // Disable the "Next" button
      document.getElementById('compute-b-next-button').disabled = true;
      
      //disable reset button
      document.getElementById('resetbut').disabled=true;
    }
  }
 

//for calculation part


var yValue;
var b0Value;
var b1Value;
var  roundedB0Value;
var  roundedB1Value; 
var  roundedYValue;
var xValueTesttt;



function submitData() 
{
  // Retrieve entered values for b0 equation
  const inputSummationX = parseInt(document.getElementById('input-summation-x').value);
  const inputSummationX1 = parseInt(document.getElementById('input-summation-xp').value);
  const inputSummationY = parseInt(document.getElementById('input-summation-y').value);
  const inputSummationXY = parseInt(document.getElementById('input-summation-xy').value);
  const inputSummationX21 = parseInt(document.getElementById('input-summation-x21').value);
  const inputSummationX22 = parseInt(document.getElementById('input-summation-x22').value);


  // Retrieve the values from the 11th row
  const table = document.getElementById('data-table');
  const row11 = table.rows[11];
  const row11XValue = parseInt(row11.cells[1].innerHTML);
  const row11X1Value = parseInt(row11.cells[1].innerHTML);
  const row11YValue = parseInt(row11.cells[2].innerHTML);
  const row11XYValue = parseInt(row11.cells[3].innerHTML);
  const row11X2Value = parseInt(row11.cells[4].innerHTML);

  if(isNaN(inputSummationX ) && isNaN(inputSummationX1) && isNaN(inputSummationY) && isNaN(inputSummationXY) && isNaN(inputSummationX21) && isNaN(inputSummationX22))
  {
    document.getElementById('input-summation-x').style.border = "2px solid red";
    document.getElementById('input-summation-xp').style.border = "2px solid red";
    document.getElementById('input-summation-y').style.border = "2px solid red";
    document.getElementById('input-summation-xy').style.border = "2px solid red";
    document.getElementById('input-summation-x21').style.border = "2px solid red";
    document.getElementById('input-summation-x22').style.border = "2px solid red";

    alerts('info','Enter the required values.', 'Missing Values!!');
  
    return;
  }

  if (
    inputSummationX === row11XValue &&
    inputSummationX1 === row11X1Value &&
    inputSummationY === row11YValue &&
    inputSummationXY === row11XYValue &&
    inputSummationX21 === row11X2Value && inputSummationX22 === row11X2Value
  ) {

    b0Value = ((row11YValue * row11X2Value) - (row11X1Value * row11XYValue)) /((10 * row11X2Value) - (row11X1Value * row11X1Value));

    b0Value=b0Value.toFixed(2)
    result = 'b₀ = ' + b0Value ;

    alerts('success','Now, enter the necessary values for the <b style="color:#FF6600">b₁</b> equation from the table.<br><b style="color:#FF6600">Note: </b> Values are rounded to two decimal places.', result);

    // submit button
    document.getElementById('compute-submit-button').style.display = 'none';
    document.getElementById('compute-submit-button2').style.display = 'block';

    // Hide other equations
    document.getElementById('b1-equation').style.display = 'block';
    document.getElementById('linear-equation').style.display = 'none';

    // Display b0 equation
    document.getElementById('b0-equation').style.display = 'none';
  }  
  else{

    let countfof = 0;
  let a = "";
  let g = "";

  if (isNaN(inputSummationY) || inputSummationY !== row11YValue) {
    a += "ΣY, ";
    countfof++;
    document.getElementById('input-summation-y').style.border = "2px solid red";
  } else {
    document.getElementById('input-summation-y').style.border = "";
  }

  if (isNaN(inputSummationX21) || inputSummationX21 !== row11X2Value) {
    a += "ΣX², ";
    countfof++;
    document.getElementById('input-summation-x21').style.border = "2px solid red";
  } else {
    document.getElementById('input-summation-x21').style.border = "";
  }

  if (isNaN(inputSummationX) || inputSummationX !== row11XValue) {
    a += " ΣX, ";
    countfof++;
    document.getElementById('input-summation-x').style.border = "2px solid red";
  } else {
    document.getElementById('input-summation-x').style.border = "";
  }

  if (isNaN(inputSummationXY) || inputSummationXY !== row11XYValue) {
    a += "ΣXY, ";
    countfof++;
    document.getElementById('input-summation-xy').style.border = "2px solid red";
  } else {
    document.getElementById('input-summation-xy').style.border = "";
  }

  if (isNaN(inputSummationX22) || inputSummationX22 !== row11X2Value) {
    a += "ΣX², ";
    countfof++;
    document.getElementById('input-summation-x22').style.border = "2px solid red";
  } else {
    document.getElementById('input-summation-x22').style.border = "";
  }

  if (isNaN(inputSummationX1) || inputSummationX1 !== row11X1Value) {
    a += "ΣX, ";
    countfof++;
    document.getElementById('input-summation-xp').style.border = "2px solid red";
  } else {
    document.getElementById('input-summation-xp').style.border = "";
  }

   if (countfof > 0) {
    
    b=a.substring(0,a.length-2);
    b='Enter the required values in highlighted cell i.e. ' +b;
    alerts('error',b, 'Oops!!!!!');
  } 
  }

}

function submitData2() 
{
 
  
  // Retrieve entered values for b1 equation
  const b1SummationX = parseInt(document.getElementById('b1-summation-x').value);
  const b1SummationX1 = parseInt(document.getElementById('b1-summation-xp').value);
  const b1SummationY = parseInt(document.getElementById('b1-summation-y').value);
  const b1SummationXY = parseInt(document.getElementById('b1-summation-xy').value);
  const b1SummationX2 = parseInt(document.getElementById('b1-summation-x22').value);


  // Retrieve the values from the 11th row
  const table = document.getElementById('data-table');
  const row11 = table.rows[11];
  const row11XValue = parseInt(row11.cells[1].innerHTML);
  const row11X1Value = parseInt(row11.cells[1].innerHTML);
  const row11YValue = parseInt(row11.cells[2].innerHTML);
  const row11XYValue = parseInt(row11.cells[3].innerHTML);
  const row11X2Value = parseInt(row11.cells[4].innerHTML);

  if(isNaN(b1SummationX) && isNaN(b1SummationX1) && isNaN(b1SummationY) && isNaN(b1SummationXY) && isNaN(b1SummationX2))
  {
    document.getElementById('b1-summation-x').style.border = "2px solid red";
    document.getElementById('b1-summation-xp').style.border = "2px solid red";
    document.getElementById('b1-summation-y').style.border = "2px solid red";
    document.getElementById('b1-summation-xy').style.border = "2px solid red";
    document.getElementById('b1-summation-x22').style.border = "2px solid red";

    alerts('info','Enter the required values.', 'Missing Values!!');
  
    return;
  }

  if (
    b1SummationX === row11XValue &&
    b1SummationX1 === row11X1Value &&
    b1SummationY === row11YValue &&
    b1SummationXY === row11XYValue &&
    b1SummationX2 === row11X2Value
  ) {

 

     // Calculate b0
b0Value = ((row11YValue * row11X2Value) - (row11X1Value * row11XYValue)) /
((10 * row11X2Value) - (row11X1Value * row11X1Value));

// Calculate b1
b1Value = ((10 * row11XYValue) - (row11X1Value * row11YValue)) /
((10 * row11X2Value) - (row11X1Value * row11X1Value));

// Round the calculated values to 4 decimal places
roundedB0Value = b0Value.toFixed(2);
roundedB1Value = b1Value.toFixed(2);

result = 'b₁ = ' + roundedB1Value ;
alerts('success','Now, enter the values of b₀ & b₁ to calculate glucose level(y) for the given age(x).<br><b style="color:#FF6600">Note: </b> Values are rounded to two decimal places.', result);

 // submit button
 document.getElementById('compute-submit-button2').style.display = 'none';
 document.getElementById('compute-submit-button3').style.display = 'block';

// Hide other equations
document.getElementById('b0-equation').style.display = 'block';
document.getElementById('b1-equation').style.display = 'block';
// Display linear equation
document.getElementById('linear-equation').style.display = 'block';



// Display the calculated values
document.getElementById('b0-equation').innerHTML = '<span class="result1">b<sub>0</sub> = ' + roundedB0Value + '</span>';

document.getElementById('b1-equation').innerHTML = '<span class="result2">b<sub>1</sub> = ' + roundedB1Value + '</span>';

// Retrieve the value of xValueTest from a source (e.g., a variable)
 xValueTesttt = xValueTest; // Example value to retrieve

// Set the value directly in the HTML element
const xValueDisplay = document.getElementById('xValueDisplay');
xValueDisplay.textContent = xValueTesttt;

}
else{
  let countfof = 0;
  let a = "";
  
  if (isNaN(b1SummationXY) || b1SummationXY !== row11XYValue) {
    a += "ΣXY, ";
    countfof++;
    document.getElementById('b1-summation-xy').style.border = "2px solid red";
  } else {
    document.getElementById('b1-summation-xy').style.border = "";
  }

  if (isNaN(b1SummationX) || b1SummationX !== row11XValue) {
    a += "ΣX, ";
    countfof++;
    document.getElementById('b1-summation-x').style.border = "2px solid red";
  } else {
    document.getElementById('b1-summation-x').style.border = "";
  }

  if (isNaN(b1SummationY) || b1SummationY !== row11YValue) {
    a += " ΣY, ";
    countfof++;
    document.getElementById('b1-summation-y').style.border = "2px solid red";
  } else {
    document.getElementById('b1-summation-y').style.border = "";
  }

  if (isNaN(b1SummationX2) || b1SummationX2 !== row11X2Value) {
    a += "ΣX², ";
    countfof++;
    document.getElementById('b1-summation-x22').style.border = "2px solid red";
  } else {
    document.getElementById('b1-summation-x22').style.border = "";
  }

  if (isNaN(b1SummationX1) || b1SummationX1 !== row11X1Value) {
    a += "ΣX, ";
    countfof++;
    document.getElementById('b1-summation-xp').style.border = "2px solid red";
  } else {
    document.getElementById('b1-summation-xp').style.border = "";
  }

   if (countfof > 0) {
    
    b=a.substring(0,a.length-2);
    b='Enter the required values in highlighted cell i.e. ' +b;
    alerts('error',b, 'Oops!!!!!');
  } 
}

}

function submitData3()
{
  const enteredB0Value = parseFloat(document.getElementById('b0-equation-1').value);
  const enteredB1Value = parseFloat(document.getElementById('b1-equation-1').value);
  

  if(isNaN(enteredB0Value) && isNaN(enteredB1Value))
  {
    document.getElementById('b0-equation-1').style.border = "2px solid red";
    document.getElementById('b1-equation-1').style.border = "2px solid red";

    alerts('info','Enter the required values.', 'Missing Values!!');
    return;
  }

  if (enteredB0Value === parseFloat(roundedB0Value) && enteredB1Value === parseFloat(roundedB1Value)) {
  
    yValue = enteredB0Value + enteredB1Value * xValueTesttt;
    console.log(yValue);
  
    roundedYValue = yValue.toFixed(2);
  
    // Display the calculated result
    document.getElementById('linear-equation').innerHTML = '<span class="result3">Glucose-level (y) = ' + roundedYValue + '</span>';
  
    document.getElementById('compute-reset-button').disabled = true;
  
    // Disable the submit button
          document.getElementById('compute-submit-button3').disabled = true;
    
          // Enable the next button
          document.getElementById('compute-next-button').disabled = false;
    
  
  result= 'Glucose-level (y) = '+roundedYValue;
          alerts('success','Now, click on <b style="color: #FF6600">NEXT</b> button.',result);

  return;
  
  }
  
  else{

    let countfof = 0;
  let a = "";
  
  if (isNaN(enteredB0Value) || enteredB0Value !== parseFloat(roundedB0Value)) {
    a += "b₀, ";
    countfof++;
    document.getElementById('b0-equation-1').style.border = "2px solid red";
  } else {
    document.getElementById('b0-equation-1').style.border = "";
  }

  if (isNaN(enteredB1Value) || enteredB1Value !== parseFloat(roundedB1Value)) {
    a += "b₁, ";
    countfof++;
    document.getElementById('b1-equation-1').style.border = "2px solid red";
  } else {
    document.getElementById('b1-equation-1').style.border = "";
  }

  if (countfof > 0) {
    b=a.substring(0,a.length-2);
    b='Enter the required values in highlighted cell i.e. ' +b;
    alerts('error',b, 'Oops!!!!!');
  } 
  }
 
  return;
    }  
 

  MathJax.typesetPromise()
      .then(() => console.log('MathJax typesetting complete'))
      .catch((err) => console.log('MathJax typesetting failed: ' + err.message));

   //tab
 // Get the tab elements
function goToAnalysisPhase() {
    document.getElementById('analyseSection').classList.remove('hidden');

    var calculationContainer = document.getElementById('calculationcontainer');
    if (calculationContainer) {
      calculationContainer.remove();
    }
  
    // Remove the formulae container
    var formulaeContainer = document.getElementById('formulaecontainer');
    if (formulaeContainer) {
      formulaeContainer.remove();
    }
  
    // Remove the next button
    var nextButton = document.getElementById('compute-button-container');
    if (nextButton) {
      nextButton.remove();
    }
  
    // Remove the child buttons
    var computeXYButton = document.getElementById('compute-xy-button');
    if (computeXYButton) {
      computeXYButton.remove();
    }
    var computeX2Button = document.getElementById('compute-x2-button');
    if (computeX2Button) {
      computeX2Button.remove();
    }
    var computeY2Button = document.getElementById('compute-y2-button');
    if (computeY2Button) {
      computeY2Button.remove();
    }
    var computeSummationButton = document.getElementById('compute-summation-button');
    if (computeSummationButton) {
      computeSummationButton.remove();
    }
  
    // Increase the size of the sub-div-table
    var subDivTable = document.getElementById('subtableId');
    subDivTable.style.setProperty('width', '438px', 'important');
   
  
    // Increase the size of the sec-con-table
    var secConTable = document.getElementById('tableId');
    secConTable.style.setProperty('width', '438px', 'important');
  
    // Adjust the width of the data-table
    var dataTable = document.getElementById('data-table');
    dataTable.style.setProperty('width', '280px', 'important');
    dataTable.style.setProperty('margin-top', '0');

// Set the position of the data-table in the middle of the sub-div-table
dataTable.style.left = '50%';
dataTable.style.transform = 'translateX(-40%)';


    // Hide the 11th row if it exists
   // var rowToHide = dataTable.rows[11];
   // if (rowToHide) {
   //   rowToHide.style.display = 'none';
 //   }
    dataTable.deleteRow(11);

    // Get a reference to the table element
var table = document.getElementById('data-table');

// Get the index of the columns you want to hide
var columnIndexXY = 3; // Replace 1 with the actual index of the XY column
var columnIndexX2 = 4; // Replace 2 with the actual index of the X^2 column

// Loop through each row of the table
for (var i = 0; i < table.rows.length; i++) {
  var row = table.rows[i];

  // Hide the columns by setting their display property to 'none'
  row.cells[columnIndexXY].style.display = 'none';
  row.cells[columnIndexX2].style.display = 'none';
  
}


   // Get a reference to the table element
   var table = document.getElementById('data-table');

   // Create a new row
   var newRow = table.insertRow(-1); // -1 to insert at the last position
   
   // Create cells for the row
   var cell1 = newRow.insertCell(0);
   var cell2 = newRow.insertCell(1);
   var cell3 = newRow.insertCell(2);
   

   // Get the 11th row (index 10 since indexing starts from 0)
var rowToHighlight = table.rows[11];

// Add CSS classes to highlight and bold the row
rowToHighlight.classList.add('highlighted-row');
rowToHighlight.classList.add('bold-row');

   // Set the values for each cell
   cell1.innerHTML = '11'; // Set S.no as 11
   cell2.innerHTML = xValueTest; // Retrieve value of x from the variable xValueTest
   cell3.innerHTML = yValue.toFixed(2);    
  }
 
function previousphase() {
    // Empty the input fields for b0-equation
    var inputFieldsB0 = document.querySelectorAll('#b0-equation input[type="number"]');
    for (var i = 0; i < inputFieldsB0.length; i++) {
      inputFieldsB0[i].value = '';
    }
    
    // Empty the input fields for b1-equation
    var inputFieldsB1 = document.querySelectorAll('#b1-equation input[type="number"]');
    for (var i = 0; i < inputFieldsB1.length; i++) {
      inputFieldsB1[i].value = '';
    }

    //Empty the input fields for Y-equation
    var inputFieldsY = document.querySelectorAll('#linear-equation input[type="number"]');
    for (var i = 0; i < inputFieldsY.length; i++) {
      inputFieldsY[i].value = '';
    }
  }
  
  // Execute the 'previousphase' function when the compute-reset-button is clicked
  document.getElementById('compute-reset-button').addEventListener('click', previousphase);
  

  //analysis phase table
  // Get the reference to the tables
  var dataX=[];var dataY=[];
  function drawChart1() {

    document.getElementById('plot-analysis').disabled = true;
    document.getElementById('print').disabled = false;
    
    var table = document.getElementById('data-table');
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Y');
    data.addColumn({ type: 'string', role: 'style' }); // Add a style column

    console.log('tableRows:'+table.rows.length)
    for (var i = 1; i < table.rows.length; i++) {
          var xValue = Number(table.rows[i].cells[1].textContent);
          var yValue = Number(table.rows[i].cells[2].textContent);
          console.log(xValue,yValue)
          var style = (i === 11) ? 'point { size: 6; fill-color: red; }' : null; // Apply custom style to 10th data point
          data.addRow([xValue, yValue, style]);

      }
        
    // Calculate linear regression
    function linearRegression()
    {
      var sumX = 0;
      var sumY = 0;
      var sumXY = 0;
      var sumXSquare = 0;
      var numRows = data.getNumberOfRows();
    console.log('numRows:'+numRows)
      for (var i = 0; i < numRows-1; i++) {
        var x = data.getValue(i, 0);
        var y = data.getValue(i, 1);
        dataX.push(x)
        dataY.push(y)
        console.log(x,y)
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumXSquare += x * x;
      }
    
      console.log(dataX)
      console.log(dataY)
      let n=numRows-1;
      let slope = ((n * sumXY) - (sumX * sumY)) / ((n * sumXSquare) - (sumX * sumX)); //b1
      let intercept = ((sumY * sumXSquare) - (sumX * sumXY)) / ((n * sumXSquare) - (sumX * sumX)); //b0
      return { slope, intercept };
    }
 
   // Calculate slope and intercept for our data
   const { slope, intercept } = linearRegression();

      // Generate points for the regression line
      const regressionLine = dataX.map(x => slope * x + intercept);

    var options = {
      
      titleTextStyle: { fontSize: 19 ,color: 'red'},
      title: 'LINEAR REGRESSION',
   
      // Set the position of the title at the top
      legend: { position: 'none' },
      hAxis: {
        titleTextStyle: { fontSize: 15 },
        title:' AGE (yrs)',
        minValue: 0,
        titlePosition: 'out'
      },
      vAxis: {
        titleTextStyle: { fontSize: 18 },
        title: 'GLUCOSE-LEVEL (mg/dL) ',
        minValue: 0
      },
      trendlines: {
        0: {
          type: 'linear',
          color: 'red',
          data: dataX.map((x, i) => ({x: x, y: regressionLine[i]})),
          lineWidth: 2,
          showR2: true,
          visibleInLegend: true,
          labelInLegend: 'Linear Regression'
        }
      },
      chartArea: { width: '80%', height: '80%' },
      colors: ['blue']
      
    }; 
 var chart = new google.visualization.ScatterChart(document.getElementById('graph'));
    chart.draw(data, options);
  

}

  //print and plot
  function printPage() {
      window.print();
     }
  

  // Function to handle the tab change
function tabChange() {
    var nextClass = document.querySelectorAll('.tab-create.tab-1-disInvert');
    var currentClass = document.querySelectorAll('.tab-1-invert');

    for (var i = 0; i < nextClass.length; i++) {
        nextClass[i].className = 'tab-create tab-1-invert';
    }

    for (var i = 0; i < currentClass.length; i++) {
        currentClass[i].className = 'tab-create tab-1-disInvert';
    }
    document.getElementById('tab-1').style.backgroundColor = "#444648";
    document.getElementById('tab-2').style.backgroundColor = "#e0e0e0";
    document.getElementById('createimg').src='images/create.png';
    document.getElementById('calcimg').src='images/calculator1.png';
    document.getElementById('createimg').style.cursor='not-allowed';
    document.getElementById('calcimg').style.cursor='pointer';

    // Remove the 11th row from the observation table
    var observationTable = document.getElementById('data-table');
    observationTable.deleteRow(11);
  
    console.log('delete row');
}

document.getElementById('compute-b-next-button').addEventListener('click', function() {
            
            
  // Increase the size of the sub-div-table
  var subDivTable = document.getElementById('subtableId');
  subDivTable.style.width = '515px'; // Increase the width of the sub-div-table


  // Increase the size of the sub-div-table
  var secconTable = document.getElementById('tableId');
  secconTable.style.width = '515px'; // Increase the width of the sub-div-table


  var dataTable = document.getElementById('data-table');
  dataTable.style.width = '300px'; // Increase the width of the data-table

 // Set the position of the data-table in the middle of the sub-div-table
 dataTable.style.left = '60%';
 dataTable.style.transform = 'translateX(-40%)';


  // You can also modify the size of other related elements here, if needed


   // Hide the 11th row if it exists
   var rowToHide = document.getElementById('data-table').rows[11];
        if (rowToHide) {
          rowToHide.style.display = 'none';
          
        }

// Create a new row
var newRow = document.getElementById('data-table').insertRow(-1); // -1 to insert at the last position
        
        // Create cells for the row
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
 
        
        // Set the content for each cell
        cell1.innerHTML = '<strong>Σ</strong>'; // Summation sign
        cell2.innerHTML = ''; // Empty cell
        cell3.innerHTML = ''; // Empty cell
        cell4.innerHTML = ''; // Empty cell
        cell5.innerHTML = ''; // Empty cell
                      
      
        newRow.style.fontWeight = 'bold'; 
        newRow.style.color = '#FF6600'; 


// Function to add the extra columns (XY, X2)
function addExtraColumnsAndRow() {
  var dataTable = document.getElementById('data-table');
  var headerRow = dataTable.querySelector('tr');

  // Add the XY column
  var xyHeader = document.createElement('th');
  xyHeader.innerHTML = 'XY';
  headerRow.appendChild(xyHeader);

  // Add the X2 column
  var x2Header = document.createElement('th');
  x2Header.innerHTML = 'X²';
  headerRow.appendChild(x2Header);
}


  addExtraColumnsAndRow();


// Enable XY button and disable other buttons initially
document.getElementById('compute-xy-button').disabled = false;

  });

  
    // Global variables to store the computed values
    let xyValues = [];
    let x2Values = [];
    let summationValues = [];

    // Function to compute XY values
    function computeXY() {
      const table = document.getElementById('data-table');
      const rows = table.rows;

      for (let i = 1; i < rows.length - 1; i++) {
        const xValue = parseInt(rows[i].cells[1].innerHTML);
        const yValue = parseInt(rows[i].cells[2].innerHTML);
        const xyValue = xValue * yValue;

        rows[i].insertCell(3).innerHTML = xyValue;
        xyValues.push(xyValue);
      }

      // Disable XY button and enable X^2 button
      document.getElementById('compute-xy-button').disabled = true;
      document.getElementById('compute-x2-button').disabled = false;
    }

    // Function to compute X^2 values
    function computeX2() {
      const table = document.getElementById('data-table');
      const rows = table.rows;

      for (let i = 1; i < rows.length - 1 ; i++) {
        const xValue = parseInt(rows[i].cells[1].innerHTML);
        const x2Value = xValue * xValue;

        rows[i].insertCell(4).innerHTML = x2Value;
        x2Values.push(x2Value);
      }

      document.getElementById('compute-x2-button').disabled = true;
      document.getElementById('compute-summation-button').disabled = false;
    }



    function computeSummation() {

      var submitButton = document.getElementById("compute-submit-button");
submitButton.disabled = false;
document.getElementById('compute-reset-button').disabled = false;
const table = document.getElementById('data-table');
const rows = table.rows;

let sumX = 0;
let sumY = 0;
let sumXY = 0;
let sumX2 = 0;
let validRowsCount = 0;

for (let i = 1; i < rows.length - 1; i++) {
const cells = rows[i].cells;

if (cells.length >= 5) {
const xValue = parseInt(cells[1].innerHTML);
const yValue = parseInt(cells[2].innerHTML);
const xyValue = parseInt(cells[3].innerHTML);
const x2Value = parseInt(cells[4].innerHTML);

if (!isNaN(xValue)) {
sumX += xValue;
validRowsCount++;
}

if (!isNaN(yValue)) {
sumY += yValue;
}

if (!isNaN(xyValue)) {
sumXY += xyValue;
}

if (!isNaN(x2Value)) {
sumX2 += x2Value;
}
}
}

let summationRow = table.rows[11];
if (!summationRow) {
summationRow = table.insertRow(11);
summationRow.id = 'summation-row';

for (let j = 0; j < 5; j++) {
summationRow.insertCell();
}
}


summationRow.cells[1].innerHTML = sumX;
summationRow.cells[2].innerHTML = sumY;
summationRow.cells[3].innerHTML = sumXY;
summationRow.cells[4].innerHTML = sumX2;

// Disable summation button
const summationButton = document.getElementById('compute-summation-button');
if (summationButton) {
summationButton.disabled = true;
}


Swal.fire({
title: 'Table Completed!!',
html: 'Now, enter the necessary values for the <b style="color:#FF6600">b₀</b> equation from the table.',
icon: 'success',
customClass: {
  container: "position-absolute",   
  popup: "swal2-popup",
  title: "swal2-title",
  content: "swal2-content",
},
target: myContainer,
didOpen: () => {
  const container = document.querySelector('.position-absolute');
  const containerWidth = myContainer.offsetWidth;
  const containerHeight = myContainer.offsetHeight;

  // Change font size based on container size
  if (containerWidth >= 1000 && containerHeight >= 672) {
      container.style.fontSize = '24px';
  } else {
      container.style.fontSize = '16px';
  }

  // Adjust dimensions and position of the Swal container
  container.style.position = 'absolute';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.top = '0';
  container.style.left = '0';
  container.style.padding = '0';
},
});
return;

}

var myList=[];
function tabChangeIntoAnalysis() {

    title= 'The glucose level for the given age ' + xValueTesttt + ' is ' + roundedYValue;
    alerts('success', 'Now click on <b style="color: #FF6600">PLOT</b> button.'  ,title)
    let NextClass = document.querySelectorAll(".tab-create.tab-2-disInvert");
    let currentClass = document.querySelectorAll(".tab-1-invert");
    for (let i = 0; i < NextClass.length; i++) {
        NextClass[i].className = "tab-create tab-2-invert";
    }
    for (let i = 0; i < currentClass.length; i++) {
        currentClass[i].className = "tab-create tab-1-disInvert";
    }
    document.getElementById('tab-2').style.backgroundColor = "#444648";
    document.getElementById('tab-3').style.backgroundColor = "#e0e0e0";
    document.getElementById('anaimg').src='images/analysis_icon1.png';
    document.getElementById('anaimg').style.cursor='pointer';
    document.getElementById('calcimg').src='images/calculator.png';
    document.getElementById('calcimg').style.cursor='not-allowed';

    let table=document.getElementById('tableId');
    table.style.height="416px";

    let tableDiv=document.getElementById('subtableId');
    tableDiv.style.height="423px";

    let dataTable=document.getElementById('data-table');
    dataTable.style.fontSize="11px";
    dataTable.style.top="1%";

    document.getElementById('tablesContainer').style.height="380px";

    //interpretation div
    document.getElementById('interDiv').style.display="flex";

    a='When age is 0, the model predicts a glucose level of '+roundedB0Value+ '.';
    myList.push(a);
    b='For each additional year of Age, the model predicts an increase of '+roundedB1Value+ ' in the glucose level.';
    myList.push(b);
   
    var ul = document.createElement('ul');

// Iterate through the array and create list items (li) for each item
myList.forEach(function(item) {
  var li = document.createElement('li');
  li.textContent = item;
  ul.appendChild(li);
});

// Append the generated list to the container
document.getElementById('listContainer').appendChild(ul);
}

//for value of x 
// JavaScript function to check X-value

function limitDecimals(event) {
  var input = event.target;
  var value = input.value;

  // Check if there are more than two decimal places
  if (value.indexOf(".") !== -1 && value.split(".")[1].length > 2) {
      // Remove the extra decimal places
      input.value = parseFloat(value).toFixed(2);
  }
}

const inputElement = document.getElementById('X');
inputElement.addEventListener('keydown', function (event) {
  const key = event.key;

  if (key === '+' || key === '-' || key.toLowerCase() === 'e') {
      event.preventDefault();
  }

});
const inputElementY = document.getElementById('Y');
inputElementY.addEventListener('keydown', function (event) {
  const key = event.key;

  if (key === '+' || key === '-' || key.toLowerCase() === 'e') {
      event.preventDefault();
  }

});

