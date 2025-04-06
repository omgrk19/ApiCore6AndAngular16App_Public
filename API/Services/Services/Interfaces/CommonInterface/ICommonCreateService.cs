﻿using DataModels.Models;

namespace Services.Services.Interfaces.CommonInterface
{
    public interface ICommonCreateService<T> where T : class
    {
        Task<(int, string, T)> Add(T model);
    }
}
