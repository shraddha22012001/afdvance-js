
function getData(){
    let qR = document.getElementById("yourrow").value;
    let qC = document.getElementById("yourcolumn").value;
    let oR = document.getElementById("opponentrow").value;
    let oC = document.getElementById("opponentcolumn").value;
    
  

  class Employee
  {

    constructor()
    {
      this.qR=qR;
      this.qC=qC;
      this.oR=oR;
      this.oC=oC;
    }

canAttack()
{
    if (this.qR == this.oR)
        return true;
 
    if (this.qC == this.oC)
        return true;
 
    if (Math.abs(this.qR - this.oR) == Math.abs(this.qC - this.oC))
        return true;
 
    return false;
}
  }


var emp=new Employee(qR, qC, oR, oC);         
if (emp.canAttack(qR, qC, oR, oC))
alert("Yes-> Queens can attact eachother");
      // document.getElementById("res").innerText = "Yes-> Queens can attact eachother"
else
alert(" No -> Queens can't attack eachother");
      // document.getElementById("res").innerText = "No -> Queens can't attack eachother"
}   