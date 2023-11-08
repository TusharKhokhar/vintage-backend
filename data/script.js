const seeddata = require("./product.json");
const typedata = require('./type_info.json')
const product_attribute = require("./product_attributes.json")
const category = require("./category.json")
const collection=require("./collection.json")
const fs = require('fs')
let newdata=[]

seeddata.map((e,i)=>
{
    let atrrarr=product_attribute.filter((atr,i)=>atr.product_id==e.id)
    let category_name = category.find(ct=>ct.id==e.category_id)?.name
    let category_id = collection.find(cl=>cl.title==category_name)
    // console.log(category_id)
    let year=""
    let style=""
    atrrarr.forEach((item,i)=>
    {
        let  typedataobj=typedata.find(ty=>ty.id==item.type_info_id)
        if (typedataobj.type=="style")
        {
            style=typedataobj.name
        }
        else if (typedataobj.type=="year")
        {
            style=typedataobj.name
        }
    })
    // let typearr=typedata.filter((ty,i)=>ty.id==atrrarr.type_info_id)
    let content={
        "title": e.name,
        "collection_id": category_id?.id, //category id from table
        "categories": [
          
        ],
        "subtitle": e.page_title,
        "description": e.description,
        "handle": e.slug,
        "is_giftcard": false,
        "weight": e.weight,
        "height": e.height,
        "width": e.width,
        "length": e.length,
        "hs_code": e.product_code,
        "discountable": e.is_discount_excluded==0?false:true,
        "images": [
          ],
        "options": [
          {
            "title": "Style",
            "values": [] 
          },
          {
            "title": "Year",
            "values": []
          },
          {
            "title": "Free Shipping",
            "values": []
          },
          {
            "title": "Featured",
            "values": []
          },
          {
            "title": "Sold",
            "values": []
          },
          {
            "title": "Active",
            "values": []
          }
        ],
        "variants": [
          {
            "title": e.page_title,
            "prices": [
              {
                "currency_code": "usd",
                "amount": e.price
              }
            ],
            "options": [
                {
                    "value": style
                  },
                  {
                    "value": year
                  },
                  {
                    "value": e.free_shipping==0?false:true
                  },
                  {
                    "value": e.is_featured==0?false:true
                  },
                  {
                    "value": e.is_sold==0?false:true
                  },
                  {
                    "value": e.is_active==0?false:true
                  }
            ],
            "inventory_quantity": 2, //to be discussed
            "manage_inventory": true
          }
        ]
      }
      newdata.push(content)
})
// Convert the data to a JSON string
const jsonData = JSON.stringify(newdata, null, 2) + '\n';

// Specify the file path
const filePath = 'FinalResult.json';

// Append data to the JSON file
fs.writeFile(filePath, jsonData, 'utf8', (err) => {
  if (err) {
    console.error('Error appending data to JSON file:', err);
  } else {
    console.log('Data appended to JSON file successfully.');
  }
});
