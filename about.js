window.addEventListener('DOMContentLoaded', function() {
    var projects = document.querySelectorAll('.project');
    var delay = 0;
    projects.forEach(function(project) {
        project.style.animation = `slideInSide 1s ease-out ${delay}s`;
        delay += 0.3;
    });
});

