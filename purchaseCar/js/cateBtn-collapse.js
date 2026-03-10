$(document).ready(function() {
    // Toggle view functionality
    $('.toggle-btn').on('click', function() {
        // Remove active class from all buttons and add to clicked button
        $('.toggle-btn').removeClass('active');
        $(this).addClass('active');

        // Hide all views and show the selected one
        const viewToShow = $(this).data('view');
        $('.view-content').removeClass('active');
        $(`#${viewToShow}View`).addClass('active');
    });

    // Collapse functionality for both views
    const setupCollapse = function(collapseBtn, collapseContent) {
        let isCollapsed = true;
        
        $(collapseBtn).on('click', function() {
            if (isCollapsed) {
                $(collapseContent).addClass('expanded');
                $(this).text('Show less');
            } else {
                $(collapseContent).removeClass('expanded');
                $(this).text('Show more');
            }
            isCollapsed = !isCollapsed;
        });
    };

    // Setup collapse for both category and brand views
    setupCollapse('#collapseBtn', '#categoryView .collapse-content');
    setupCollapse('#brandCollapseBtn', '#brandView .collapse-content');
});
