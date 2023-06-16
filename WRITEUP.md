# Write up 

This document provides details and explation regarding 2 features added to the multimedia app in the context of bounty. 



## Feature 1 - Space Breaking down

### Description

The first feature delivered is a robust space breakdown feature that aims to provide our users with a comprehensive and visual overview of thier storage capacity. 

File size is added to each files and a new control button called "Space breakdown" is implemented between "Files Breakdown" button and "Download" button. 
When the button is clicked, a pop-up window is displayed, presenting critical storage information, including : 
- Total space provided by T's Drive
- Space consumed by the user
- A pie chart showing the space consumed by each file type as well as the remaining free space. 

### Benefit

Storage is a crucial element in multimedia applications and the "Space Breakdown" feature empowers our users to monitor and manage their storage effectively.
Additionally, the inclusion of a pie chart allows users to easly visualize and identify which types of files are consuming the most space. This enables them to effectively prioritize cleaning up or deleting unnecessary files freeing up valuable storage space. 

### Code

1) For each files, "size" data added in data.js  
#### example : `size: 3745`

2) "File size" data added under file Player or file Viewer when file is selected

3) New button "Space Brealdown" added to trigger Modal display

4) New state implemented to display Modal when button is clicked 
#### `const [showChartModalSpace, setShowChartModalSpace] = useState(false)`

5) In Modal, for each file types, .filter() and .reduce() functions used to go through each files with the same type and compute total sizes per type and free space remaining
#### example : `myFiles.filter(file => file.type === 'video').reduce((totalSize, video) => totalSize + video.size, 0)`



## Feature 2 - Files Filtering

### Description

The second feature delivered is a robust files filtering feature that enables our users to visualize their files based filters.

A new section called "Filter is implemented under control buttons. Up to 5 filters can be applied  : Video, Audio, Document, Image and Favorite.
When the filter is selected, then the files related to the filter are displayed.
When the filter is deselected, then the files related to the filter are not displayed.
Several filter can be applied at the same time, then the files realted to the filters are displayed. 
Users can also mark files as "starred" or "unstarred", and use "Favorite" filter to only display the starred files. 
Additionally, users have the ability to reset all filters and view their entire file collection.

### Benefit

User experience is a crucial element in web applications and the "Files Filtering" feature empowers our users to imporve and personalized their file organisation and selection effectively, when working with different types of multimedia files.
Additionally, by starring or marking files as favorites, users can create their personalized collection of important or frequently accessed files. This enables them to quickly locate and access their preferred files without the need to search through their entire file library.

### Code
TBD



### `npm install @fortawesome/fontawesome-free`