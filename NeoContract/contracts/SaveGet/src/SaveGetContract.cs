using System;
using System.ComponentModel;
using System.Numerics;

using Neo;
using Neo.SmartContract.Framework;
using Neo.SmartContract.Framework.Native;
using Neo.SmartContract.Framework.Services;

namespace SaveGet
{
    [DisplayName("YourName.SaveGetContract")]
    [ManifestExtra("Author", "Your name")]
    [ManifestExtra("Email", "your@address.invalid")]
    [ManifestExtra("Description", "Describe your contract...")]
    public class SaveGetContract : SmartContract
    {
        public static void Save(string data)
        {
           Storage.Put(Storage.CurrentContext,"Test",data);
        }

        public static ByteString Get()
        {
           return Storage.Get(Storage.CurrentContext,"Test");
        }
    }
}
