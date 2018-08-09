<!DOCTYPE html>
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!-->
<html lang="$ContentLocale" class="no-js">
<!--<![endif]-->
<head>
	<% base_tag %>
	<title>$SiteConfig.Title</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	$MetaTags(false)
	<link rel="shortcut icon" href="$ThemeDir/images/favicon.ico" />
	<script type="text/javascript" src="{$ThemeDir}/javascript/vendor/modernizr-2.6.2.min.js"></script>
</head>
<body>
<!--[if lt IE 7]><p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p><![endif]-->
<div id="tab-container" class='tab-container'>
<% include Header %>
<% include Navigation %>
$Layout
</div>
<% include Footer %>
</body>
</html>
