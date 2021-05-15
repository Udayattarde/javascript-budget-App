class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
  calButton()
  {
    const value=this.budgetInput.value;
    if(value === "" || value<0)
    {
      this.budgetFeedback.classList.add("showItem");
      this.budgetFeedback.innerHTML=`<p>Value cannot be empty or negative</p>`
     const budget=this;
      setTimeout(function()
      {
        budget.budgetFeedback.remove("showItem")
      },2000)
    }
    else{
      this.budgetAmount.textContent=value;
      this.budgetInput.value="";
      this.showBalance();
    }
  }

  showBalance()
  {
    const expense =this.totalExpense();
    const total=parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent=total;

    if(total<0)
    {
      this.balance.classList.remove("showGreen","ShowBlack");
      this.balance.classList.add("showRed");
    }
    else if(total>0)
    {
      this.balance.classList.remove("showRed","ShowBlack");
      this.balance.classList.add("showGreen");
    }
    else if(total==0)
    {
      this.balance.classList.remove("showRed","showGreen");
      this.balance.classList.add("ShowBlack");
    }
  }
  submitExpenseform()
  {
    const expenseName=this.expenseInput.value;
    const amountValue =this.amountInput.value;
    if(expenseName=="" || amountValue==""|| amountValue<0)
    {
      this.expenseFeedback.classList.add("showItem");
      this.expenseFeedback.innerHTML=`<p>Value cannot be empty or negative</p>`
     const expense=this;
      setTimeout(function()
      {
        expense.expenseFeedback.classList.remove("showItem")
      },2000);
    }
    else{
      let amount = parseInt(amountValue);
      this.expenseInput.value="";
      this.amountInput.value="";
      

      let expenseObject={
        id:this.itemID,
        title:expenseName,
        amount:amount,
      }

      this.itemID++;
      this.itemList.push(expenseObject);
      this.showExpense(expenseObject);
      this.showBalance();
    }
    console.log(this.itemList)
 
  }
  showExpense(expense)
  {
     const div = document.createElement('div');
     div.classList.add('expense');
     div.innerHTML=`    <div class="expense-item d-flex justify-content-between align-items-baseline">

     <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
     <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

     <div class="expense-icons list-item">

      <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
       <i class="fas fa-edit"></i>
      </a>
      <a href="#" class="delete-icon" data-id="${expense.id}">
       <i class="fas fa-trash"></i>
      </a>
     </div>
    </div>`

    this.expenseList.appendChild(div)
  }
  

  totalExpense()
  {
    let total= 0;
   if(this.itemList.length>0)
   {
     total=this.itemList.reduce((acc,curr)=>{
       acc +=curr.amount;
       return acc;
     },0);
   }
   this.expenseAmount.textContent=total;
 return total;
  }

  edit(element)
  {
    let id =parseInt(element.dataset.id);
    let  parent=element.parentElement.parentElement.parentElement;

    this.expenseList.removeChild(parent);

    let expense =this.itemList.filter(function(item){
      return item.id === id;
    });

    
    this.expenseInput.value= expense[0].title;
    this.amountInput.value= expense[0].amount;

    let newlist=this.itemList.filter(function(data){
      return data.id !== id;
    });
     this.itemList=newlist;
     this.showBalance();
     console.log(this.itemList)

  }
  delete(element)
  {
    let id =parseInt(element.dataset.id);
    let  parent=element.parentElement.parentElement.parentElement;

    this.expenseList.removeChild(parent);
    let newlist=this.itemList.filter(function(data){
      return data.id !== id;
    });

    this.itemList=newlist;
    this.showBalance();
  }
}

function eventListneres()
{
  const budgetForm= document.getElementById("budget-form");
  const expenseForm= document.getElementById("expense-form");
  const expenseList= document.getElementById("expense-list");

  const ui= new UI();

  budgetForm.addEventListener("submit", function(event)
  {
   
   event.preventDefault();
    ui.calButton();

  });

  expenseForm.addEventListener("submit",function(event)
  {
    event.preventDefault();
    ui.submitExpenseform();
  });

  expenseList.addEventListener("click",function(event)
  {

     if(event.target.parentElement.classList.contains("edit-icon"))
         ui.edit(event.target.parentElement);
      else if(event.target.parentElement.classList.contains("delete-icon"))  
         ui.delete(event.target.parentElement)
   
  });
}


document.addEventListener("DOMContentLoaded",function()
{
  eventListneres();
})


