namespace DataModels.Models
{
    public partial class MessageDetail
    {

        public string action { get; set; }
        public string action_name { get; set; }
        public Nullable<bool> st { get; set; }
        public string status { get; set; }
        public string msg_code { get; set; }
        public string message { get; set; }
    }
    public partial class Itemlist
    {
        public string Text { get; set; }
        public string Value { get; set; }
    }
}
