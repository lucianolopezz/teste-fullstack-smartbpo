import mongoose from 'mongoose';
import moment from 'moment';

const ProductSchema = new mongoose.Schema({
  name: String,  
  description: String,
  price: Number,
  expiration_date: Date,
  photo_name: String,
  photo_url: String,
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

ProductSchema.virtual('expiration_date_formatted').get(function() {
  return moment(this.expiration_date).format('DD/MM/YYYY');
});

export default mongoose.model('Product', ProductSchema);