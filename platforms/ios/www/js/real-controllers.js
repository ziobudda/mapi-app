/*!
 * Copyright 2015 Giuseppe Zileni
 * http://giuseppezileni.github.io
 *
 * Ionic, v1.0.0
 * http://ionicframework.com/
 *
 * By @gzileni
 *
 *
 */

var ctrls = angular.module('gal.real.controllers', ['cordovaDeviceMotion', 'cordovaCapture']);

// Realtà aumentata
ctrls.controller('RealCtrl', function($scope, $cordovaDeviceMotion, $cordovaCapture, Geolocation, $cordovaDeviceOrientation, $cordovaCamera) {

	var orientation;
	$scope.dataOk = true;
	$scope.isPhoto = false;

	// Create a variable to store the transform value
	$scope.transform = "rotate(0deg)";
	
	// When the number changes, update the transform string
	$scope.$watch("magnetic", function(val) {
	    $scope.transform = "rotate("+val+"deg)";
	});  

	function _onSuccess(result) {
		console.log('success orientation');
		orientation.magneticHeading = result.magneticHeading;
        orientation.trueHeading = result.trueHeading;
        orientation.accuracy = result.headingAccuracy;
        orientation.timeStamp = result.timestamp;
        $scope.magnetic = result.magneticHeading;
	};  

	function _onError(err) {
		console.log('error to orientation');
	};    

	// $scope.magnetic = 90;

	$scope.location = Geolocation.location();

	$scope.magnetic = 0;
                 
    console.log('start device orientation');

    // The watch id references the current `watchHeading`
    // $cordovaDeviceOrientation.watch(_onSuccess, _onError);

    function _getOrientation() {
    	$cordovaDeviceOrientation.get(_onSuccess, _onError);
    };

    $scope.getPhoto = function() {
	    console.log('Getting camera');

	    /*
	    Camera.getPicture({
	      quality: 75,
	      targetWidth: 320,
	      targetHeight: 320,
	      saveToPhotoAlbum: false
	    }).then(function(imageURI) {
	      console.log(imageURI);
	      $scope.lastPhoto = imageURI;
	      _getOrientation();
	      $scope.isPhoto = true;
	    }, function(err) {
	      console.err(err);
	    });
*/

	    var options = {
	      quality: 50,
	      destinationType: Camera.DestinationType.DATA_URL,
	      sourceType: Camera.PictureSourceType.CAMERA,
	      allowEdit: true,
	      encodingType: Camera.EncodingType.JPEG,
	      targetWidth: 100,
	      targetHeight: 100,
	      popoverOptions: CameraPopoverOptions,
	      saveToPhotoAlbum: false
	    };

	    $cordovaCamera.getPicture(options).then(function(imageData) {
	      // var image = document.getElementById('myImage');
	      $scope.lastPhoto = "data:image/jpeg;base64," + imageData;
	      // console.log(imageURI);
	      // $scope.lastPhoto = imageURI;
		  _getOrientation();
		  $scope.isPhoto = true;
	    }, function(err) {
	      // error
	    });

	  }

});