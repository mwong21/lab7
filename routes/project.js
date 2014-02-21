var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  // query for the specific project and
  // call the following callback
  models.Project
    .find(projectID)
    .exec(afterQuery)

  function afterQuery(err, projects) {
    if(err) console.log(err);
    //res.json(projects[0]);

    for (var i = 0; i < projects.length; i++) 
  {
    console.log(projects[i]);
    if(projects[i].id == projectID)
      res.json(projects[i])
  }
  }
}

//exports.view = function(req, res) {
  //models.Project
    //.find()
//}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();

  var newSum = form_data['summary'];

  var newProject = new models.Project({
    "title": form_data.project_title,
    "image": form_data.image_url,
    "date": form_data.date,
    "summary": newSum

  });

  console.log(newProject);

  newProject.save(afterSaving);

  function afterSaving(err) { // this is a callback
  if(err) {console.log(err); res.send(500); }
  res.redirect('/');
}
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();

  models.Project
    //.find(projectID)
    .find({"_id": projectID})
    .remove()
    .exec(afterRemoving)
   // .remove()
   

  function afterRemoving(err) {
    if(err) console.log(err);
    //res.json(projects[0]);
   res.send();
  }
}
