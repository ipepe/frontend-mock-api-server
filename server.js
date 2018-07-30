const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/api/products/:id', (req, res) => {
    res.type('application/json');
    res.send({
        product: {
            id: req.params.id,
            name: 'Headphones',
            category_id: 123,
            category_name: 'Office',
            product_image_path: '/images/headphone_holder.jpg',
            published: new Date()
        }
    });
});

app.post('/api/products/:id/rate', (req, res) => {
    console.log(req.params, req.body);
    res.type('application/json');
    res.status(422);
    let rating = parseInt(req.body.rating || '0');
    let comment = req.body.comment || { length: 0 };

    if ( rating.toString() === 'NaN' || rating < 1 || rating > 5 ) {
        res.send({errors: { rating: ['Not in valid range of 1-5']}});
    }else if(rating >= 1 && rating < 3 && comment.length < 4){
        res.send({errors: { comment: ['Is blank or too short']}});
    }else if(rating > 2 && comment.length){
        res.send({errors: { comment: ['Should be empty']}});
    }else{
        res.status(200);
        res.send({product: { id: req.params.id }})

    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
