async function getData(){
    
    const data = await fetch(`http://localhost/kkwordpress/wp-json/wc/v3/products`,{
    method:"GET",
    headers:{
        Authorization:`Basic ${btoa("Kajetan:kajtulasty12")}`
    }
    })
    const json = await data.json()
    console.log(json)
    var body = document.getElementById("post")
    body.innerHTML=" "

    for(let i in json){
        const div = document.createElement("div")
        div.classList.add("divs")
        const h1 = document.createElement("h1")
        const h2 = document.createElement("h2")
        const h3 = document.createElement("h3")
        h1.innerHTML=json[i].name
        h2.innerHTML=json[i].price+" zł"
        h3.innerHTML="Ilość w magazynie: "+json[i].stock_quantity
        const inp = document.createElement("input")
        inp.placeholder="ilość"
        inp.type="number"
        inp.id=json[i].id
        const button = document.createElement("button")
        button.innerHTML="ZATWIERDŹ"
        button.addEventListener('click',()=>{
            update(json[i].id)
        })
        div.appendChild(h1)
        div.appendChild(h2)
        div.appendChild(h3)
        div.appendChild(inp)
        div.appendChild(button)
        body.appendChild(div)





    }
}
async function update(id){
const inp = document.getElementById(id).value
const data = await fetch(`http://localhost/kkwordpress/wp-json/wc/v3/products/${id}?stock_quantity=${parseInt(inp)}`,{
    headers:{
        Authorization: `Basic ${btoa("Kajetan:kajtulasty12")}`
    },
    method:"POST"

})
const json = await data.json()
console.log(json)
getData()

}
async function add(){
    const name = document.getElementById("nazwa").value
    const cena = document.getElementById("cena").value
    const ilosc = document.getElementById("ilosc").value
    const data = await fetch(`http://localhost/kkwordpress/wp-json/wc/v3/products?name=${name}&regular_price=${parseInt(cena)}&stock_quatity=${parseInt(ilosc)}&manage_stock=true`,{
        headers:{
            Authorization: `Basic ${btoa("Kajetan:kajtulasty12")}`
        },
        method:"POST"
    })
    const json = await data.json()
    console.log(json)
    getData()

}
getData()