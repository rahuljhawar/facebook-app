

$(document).ready(function(){


	var myFacebookToken="EAACEdEose0cBAEYT70NkXRhaZApZCIcVNBTKwPWDdFoVh0kZC0LzvDmdz2o8bq6UF1H63tStFTRt8Xf0kWldb9tzVpIbfeNMnBiB11noGn0CLyVye9DagGsGx5Okjqxc4HCMOE7t5c9hjBJZASXBNZCCmYCKB1Aa99vaisiibfbB2AiaEbf6S1Ih6vUlYUocZD"; // paste users facebook token here
	 	// function to get the basic facebook details
	 	function getBasicFacebookInfo(){
	 		//Make request to facebook graph api
	 		$.ajax('https://graph.facebook.com/me?access_token='+myFacebookToken,{

	 			success : function(response){
	 				$("#mainpanel").html(`Welcome <strong>${response.name}</strong> <span><i class="fa fa-smile-o" aria-hidden="true"></i></span>`);
	 				$(".image").html(`<img src="https://graph.facebook.com/${response.id}/picture?width=140&height=140" id="thumbnail-avatar" class="img-thumbnail ">`);
	 				


	 				var template=$('#info-template').html();
    				var info_data=Mustache.render(template,response); //rendering the response data into the the mustache template
    				$('.basic-info').html(info_data);




    			},

    			error : function(request,errorType,errorMessage){
    				console.log(request);
    				console.log(errorType);
    				$('.container').html(`<div class="alert alert-info alert-dismissible" role="alert">
    					Something Went Wrong! <input type="button" class="btn btn-primary"value="Try Again" onclick="location.reload();"/>
    					<button type="button" class="close" data-dismiss="alert">
    					<span aria-hidden="true">&times;</span>
    					<span class="sr-only">Close</span>
    					</button>
    					</div>`);
    			},
    			complete :function(){
    				$("#thumbnail-avatar").addClass('zoomIn');
    			}


        });// end ajax call 



    }// end get  basic facebook info

    // function to get the user posts details
    function getPostsFacebookInfo(){
    	$.ajax('https://graph.facebook.com/me?access_token='+myFacebookToken+'&fields=posts.limit(10){message,picture,story,likes.limit(1).summary(1),comments.limit(1).summary(1),shares}',{

    		success : function(response){
    			
    			console.log(response);
    			$.each(response.posts.data,function(index,response){
    				
    				var template=$('#posts-template').html();
    				//console.log(template);
    				var posts_data=Mustache.render(template,response); //rendering the response data into the the mustache template
    				$('#postspanelbody').append(posts_data);



    			});

    		},
    		error : function(request,errorType,errorMessage){
    			console.log(request);
    			console.log(errorType);
    			$('.container').html(`<div class="alert alert-info alert-dismissible" role="alert">
    				Something Went Wrong! <input type="button" class="btn btn-primary"value="Try Again" onclick="location.reload();"/>
    				<button type="button" class="close" data-dismiss="alert">
    				<span aria-hidden="true">&times;</span>
    				<span class="sr-only">Close</span>
    				</button>
    				</div>`);
    		},
    		complete : function(){
    			$('#postspanelbody').addClass('fadeInUp');
    		}

    		});// end ajax call 



    }// end get posts facebook info



    getBasicFacebookInfo();//calling getBasicinfo function
    getPostsFacebookInfo();//calling getpostsfacebookinfo function




    $('#myTabs a').click(function (e) {
    	e.preventDefault();
    	$(this).tab('show');


    });
});
