// add contact functionality
$("#addContact").on("submit", function(event) {
    event.preventDefault();

    var newContact = {
        firstName: $("#firstName").val().trim(),
        lastName: $("#lastName").val().trim(),
        contactType: $("#contactType").val(),
        emailAddress: $("#emailAddress").val().trim(),
        phoneNumber: $("#phoneNumber").val().trim()
    }
    $.ajax({
        method: "POST",
        url: "/api/contacts",
        data: newContact
    }).then(function(contact) {
        console.log("new contact added", contact);
        location.href = "/";
    })

})
// filter contact by type functionality
$("#filterContacts").on("change", function() {
    var type = $(this).val().toLowerCase();
    // alert(type);
    location.href = `/${type}`
})
// delete contact functionality
$(".delete").on("click", function() {
    var id = $(this).parents("tr").attr("data-id");
    // alert(id);

    $.ajax({
        method: "DELETE",
        url: `/api/contacts/${id}`
    }).then(function(contact) {
        console.log("contact deleted", contact);
        location = location;
    })
})
