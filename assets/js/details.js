Vue.component('star-rating', {
  template: `<div class="rating-input rating">
      <span v-for="(_, index) in possible" class="star mr-1">
        <i v-if="index < rating" v-on:click="onRate(index + 1)" class="fa fa-star"></i>
        <i v-if="index >= rating" v-on:click="onRate(index + 1)" class="fa fa-star-o"></i>
      </span>
  </div>`,

  data: function() {
    return {
      possible: 5,      
      rating: 0,
    }
  },

  computed:{
    active: function() {
      return this.rating;
    },
    inactive: function() {
      return this.possible - this.rating;
    }
  },

  methods: {
    onRate: function(index) {
      this.rating = index;
      this.$emit('ratingchange', this.rating);
    } 
  }
})

var detailsApp = new Vue({
  el: '#panel4',
  data: {
    book_id: null,
    rating: 0,
    comments: '',
    anonymous: false,

    loading: false
  },

  computed: {
    allowSubmit: function() {
      return this.comments.trim().length > 0 || this.rating != 0
    }
  },

  methods: {
    onSubmit: function(event) {
      var self = this;
      event.preventDefault();

      var review_data = {
        rating: self.rating,
        comments: self.comments,
        anonymous: self.anonymous
      };

      $.ajax({
        type:"POST",
        url: detailsObject.review_url,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(review_data)
      }).done(function(response) {
        console.log(response);
      });
    },
    
    onRatingChange: function(rating) {
      this.rating = rating;
    }
  }
})

