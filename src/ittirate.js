basic_string = "1";
go_string = () => {
    console.log(basic_string);
    new_string = "";
    amount = 1;
    for (let i = 0; i < basic_string.length; ++i)
        if (i == basic_string.length - 1 || basic_string[i] != basic_string[i + 1]) { new_string += amount + basic_string[i]; amount = 1; }
        else
            amount += 1;
    basic_string = new_string;
}
ittirateID = setInterval(go_string, 1000);
clearInterval(ittirateID);