# Write up 

This document provides details and explanation regarding 2 features added to the multimedia app in the context of bounty. 



## Feature 1 - Space Breaking down

### Description

The first feature delivered is a robust space breakdown feature that aims to provide our users with a comprehensive and visual overview of their storage capacity. 

File size is added to each files and a new control button called "Space breakdown" is implemented between "Files Breakdown" button and "Download" button.<br> 
When the button is clicked, a pop-up window is displayed, presenting critical storage information, including : 
- Total space provided by T's Drive
- Space consumed by the user
- A pie chart showing the space consumed by each file type as well as the remaining free space. 

### Benefit

Storage is a crucial element in multimedia applications and the "Space Breakdown" feature empowers our users to monitor and manage their storage effectively.<br>
Additionally, the inclusion of a pie chart allows users to easily visualize and identify which types of files are consuming the most space. This enables them to effectively prioritize cleaning up or deleting unnecessary files freeing up valuable storage space. 

### Code

1) For each files, "size" data added in data.js  
#### example : `size: 3745`

2) "File size" data is displayed under file Player or file Viewer when file is selected by user

3) New button "Space Breakdown" added to trigger Modal display

4) New state implemented to display Modal when button is clicked 
#### `const [showChartModalSpace, setShowChartModalSpace] = useState(false)`

5) In Modal, for each file types, .filter() and .reduce() functions used to go through each files with the same type and compute total sizes per type and free space remaining
#### example : `myFiles.filter(file => file.type === 'video').reduce((totalSize, video) => totalSize + video.size, 0)`

6) Sizes are displayed in Pie chart using Chart.js


## Feature 2 - Files Filtering

### Description

The second feature delivered is a robust files filtering feature that enables our users to visualize their files based filters.

A new section called "Filters" is implemented under control buttons. Up to 5 filters can be applied  : Video, Audio, Document, Image and Favorite.<br> 
Several filter can be applied at the same time, then the files related to the filters are displayed.<br>
Users can also mark files as "starred" and use "Favorite" filter to only display the starred files.<br>
Additionally, users have the ability to reset all filters and view their entire file collection.

### Benefit

User experience is a crucial element in web applications and the "Files Filtering" feature empowers our users to improve and personalized their file organization and selection effectively, when working with different types of multimedia files.<br>
Additionally, by starring or marking files as favorites, users can create their personalized collection of important or frequently accessed files. This enables them to quickly locate and access their preferred files without the need to search through their entire file library.

### Code
1) New states implemented to track filters selected by the user  
#### `const [showChartModalSpace, setShowChartModalSpace] = useState(false)`
#### `const [showChartModalSpace, setShowChartModalSpace] = useState(false)`
#### `const [showChartModalSpace, setShowChartModalSpace] = useState(false)`
#### `const [showChartModalSpace, setShowChartModalSpace] = useState(false)`
#### `const [showChartModalSpace, setShowChartModalSpace] = useState(false)`

2) New state implemented to track reset filters triggered by the user  
#### `const [showChartModalSpace, setShowChartModalSpace] = useState(false)`

3) 5 buttons  added to trigger filters<br>
For each button, when user selects or deselect filter, then filter is applied and files are displayed accordingly.<br> 
For each button, when user selects or deselects one or more filters, then filters are applied simultaneously and files are displayed accordingly.<br>
For each button, when user selects or deselects favorite, then starred files are displayed accordingly if any files have been starred by user. 
For each button, when filter is activated, color of the button will change.<br> 
Favorite button is disabled until one file is starred by user.

4) 1 button  added to trigger reset

5) Clickable star icon added to each file to enable user to add files to favorite list. 



## BONUSES

1) UI - When user mouse is on a file, then file is highlighted until mouse is no more on file. 

2) UI - When file is selected by user, then selected file is highlighted until deselection. 

3) UI - Icons representing file type added to have a better visualization. 
### `npm install @fortawesome/fontawesome-free`