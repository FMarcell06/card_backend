import express, { json } from "express"


const PORT=8000

const app=express()
app.use(json())

let cart=[
  { id: 1, name: "Alma", category: "Gyümölcs", price: 150, quantity: 10 },
  { id: 2, name: "Banán", category: "Gyümölcs", price: 100, quantity: 5 },
  { id: 3, name: "Tej", category: "Tejtermék", price: 300, quantity: 20 }
];

app.get("/cart",(req,res)=>{
  if(cart.length==0){
    return res.status(200).json({msg:"A kosár üres"})
  }
  res.status(200).json(cart)
})

app.post("/cart",(req, res)=>{
  const {id, name, price, quantity} = req.body
  const itemIndex = cart.findIndex(obj=>obj.id==id)
  if(itemIndex==-1){
    cart.push({id, name, price, quantity})
  }else {
    const qty = cart[itemIndex].quantity
    if(qty + quantity <= 0){
      cart = cart.filter(obj=>obj.id != id)
    }else {
      cart[itemIndex].quantity+=+quantity
    }
  }
  return res.status(200).json({msg:"Kosár aktualizálva!"})
})

app.delete("/cart/:id",(req,res)=>{
  const {id} = req.params
  const itemIndex = cart.findIndex(obj=>obj.id == id)
  if(itemIndex ==-1){
    return res.status(404).json({msg:"Nem található a termék!"})
  }
  cart = cart.filter(obj=>obj.id != id)
  res.status(200).json({msg:"A termék eltávolítva!"})
})

app.patch("/cart/:id",(req,res)=>{
  const {id} = req.params
  const {quantity} = req.body
  const itemIndex = cart.findIndex(obj=>obj.id==id)
  if(itemIndex == -1){
    return res.status(404).json({msg:"Nem található a termék!"})
  }else if(quantity == 0) {
    cart = cart.finder(obj=>obj.id==id)
  }

  cart[itemIndex].quantity = quantity

  return res.status(200).json({msg:"Kosár aktualizálva!"})
})

app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`))

app.get("/cart/total",(req,res)=>{
    const total = cart.reduce((acc, obj)=>obj.quantity*obj.price + acc, 0)
    res.status(200).json({total})
})