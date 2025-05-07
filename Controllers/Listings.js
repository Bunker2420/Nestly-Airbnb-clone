const List = require('../Models/ListingSchema.js')
const cloudinary = require('cloudinary').v2;


const index = async(req,res)=>{
    let listing = await List.find({});  
    if(!listing)
    {
        req.flash("error","Listing you requested does not exist");
    }
    res.render('Listings/Listingpage',{listing});
}

const newListing = async(req,res)=>{
    console.log(req.user);
    res.render('Listings/Listingform');
}
 
const postnewListing = async(req,res)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url,filename);
    console.log(req.body); 
    let title = req.body.title;
    let description = req.body.description;
    let number = req.body.price;
    let location = req.body.location;
    let country = req.body.country;
    console.log({
        "title" : title,
        "description": description,
        "number":number,
        "location":location,
        "country":country
    });
    let list = await List.create({
        title:title,
        description:description,
        image:{
            url,filename
        },
        price:Number(number),
        location:location,
        country:country,
        owner:req.user._id,
    });
    req.flash("success","A New Listing is successfully created!");
    console.log(list);
    res.redirect('/listings')
}

const editListing = async(req,res)=>{
    let id = req.params.id;
    let list = req.list;
    res.render('Listings/editlisting',{id,list});
}

const postEditListing = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, location, country } = req.body;

    try {
        let list = req.list;

        // Update fields
        list.title = title;
        list.description = description;
        list.price = price;
        list.location = location;
        list.country = country;

        // If a new image is uploaded
        if (req.file) {
            // Delete the old image from Cloudinary
            if (list.image && list.image.filename) {
                await cloudinary.uploader.destroy(list.image.filename);
            }

            // Update with new image
            let image = req.file;
            list.image.url = image.path;
            list.image.filename = image.filename;
        }

        await list.save();

        req.flash('success', 'Successfully edited the listing');
        res.redirect(`/listings/${id}`);
    } catch (err) {
        console.error('Error updating listing:', err);
        req.flash('error', 'Something went wrong');
        res.redirect('/listings');
    }
};


const listpage = async(req,res)=>{
    let id = req.params.id;
    console.log(id);
    let list = req.list;
    console.log(list);
    const apiKey = process.env.LOCATIONIQ_API_KEY;
    res.render('Listings/eachlistpage',{list,apiKey})
}

const deleteListing =  async(req,res)=>{
    console.log('Delete route trggered');
    let id = req.params.id;
        let Delete =await List.findByIdAndDelete(id);
        req.flash('success',"Successfully deleted listing")
        if (Delete) {
            console.log('Successfully Deleted', Delete);
        } else {
            console.log('No document found to delete');
        }
        res.redirect('/listings');
}

module.exports = {index , newListing , postnewListing , editListing , postEditListing , listpage , deleteListing}