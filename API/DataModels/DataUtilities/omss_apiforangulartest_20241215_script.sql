USE [omss_apiforangulartest]
GO
/****** Object:  Table [dbo].[auth_action]    Script Date: 15-12-2024 18:42:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[auth_action](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[action] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[auth_form_mas]    Script Date: 15-12-2024 18:42:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[auth_form_mas](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[formid] [nvarchar](50) NOT NULL,
	[form_name] [nvarchar](150) NOT NULL,
	[form_link] [nvarchar](350) NULL,
	[model_id] [nvarchar](50) NULL,
	[form_st] [bit] NULL,
 CONSTRAINT [PK_auth_form_mas] PRIMARY KEY CLUSTERED 
(
	[formid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[auth_form_mas_action]    Script Date: 15-12-2024 18:42:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[auth_form_mas_action](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FormId] [nvarchar](50) NULL,
	[ActionId] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[auth_model_mas]    Script Date: 15-12-2024 18:42:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[auth_model_mas](
	[model_id] [nvarchar](50) NOT NULL,
	[model_name] [nvarchar](150) NULL,
	[model_st] [bit] NULL,
 CONSTRAINT [PK_auth_model_mas] PRIMARY KEY CLUSTERED 
(
	[model_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[auth_omgrk]    Script Date: 15-12-2024 18:42:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[auth_omgrk](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](50) NOT NULL,
	[password] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_auth_omgrk] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[auth_profile_form_action]    Script Date: 15-12-2024 18:42:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[auth_profile_form_action](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProfileId] [nvarchar](50) NOT NULL,
	[FormId] [nvarchar](50) NOT NULL,
	[ActionId] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_auth_profile_det_action] PRIMARY KEY CLUSTERED 
(
	[ProfileId] ASC,
	[FormId] ASC,
	[ActionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[auth_profile_mas]    Script Date: 15-12-2024 18:42:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[auth_profile_mas](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[profileid] [nvarchar](50) NOT NULL,
	[profile_name] [nvarchar](150) NOT NULL,
	[profile_desc] [nvarchar](250) NULL,
	[profile_st] [bit] NULL,
 CONSTRAINT [PK_auth_profile_master] PRIMARY KEY CLUSTERED 
(
	[profileid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[auth_user]    Script Date: 15-12-2024 18:42:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[auth_user](
	[Srno] [int] IDENTITY(1,1) NOT NULL,
	[userid] [nvarchar](50) NOT NULL,
	[Com_Code] [nvarchar](50) NULL,
	[user_type] [nvarchar](50) NULL,
	[mobile] [nvarchar](50) NULL,
	[email] [nvarchar](50) NULL,
	[username] [nvarchar](50) NOT NULL,
	[passwd] [nvarchar](50) NULL,
	[api_passwd_key] [nvarchar](50) NULL,
	[name] [nvarchar](50) NULL,
	[last_name] [nvarchar](50) NULL,
	[profileid] [nvarchar](50) NULL,
	[login_status] [bit] NULL,
	[login_date] [datetime] NULL,
	[logout_date] [datetime] NULL,
	[st] [bit] NULL,
	[Profile_Passw_St] [bit] NULL,
	[PhotoUrl] [nvarchar](max) NULL,
 CONSTRAINT [PK_user_mas_1] PRIMARY KEY CLUSTERED 
(
	[userid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[auth_user_profile_action]    Script Date: 15-12-2024 18:42:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[auth_user_profile_action](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](50) NOT NULL,
	[ProfileId] [nvarchar](50) NOT NULL,
	[FormId] [nvarchar](50) NOT NULL,
	[ActionId] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_auth_user_profile_action] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Department]    Script Date: 15-12-2024 18:42:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Department](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DepartmentName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Department] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Designation]    Script Date: 15-12-2024 18:42:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Designation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DesignationName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Designation_Master] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employee]    Script Date: 15-12-2024 18:42:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employee](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](max) NOT NULL,
	[LastName] [nvarchar](max) NULL,
	[DesignationId] [int] NULL,
	[EmailId] [nvarchar](max) NULL,
	[Mobile] [nvarchar](max) NULL,
	[Password] [nvarchar](max) NULL,
	[IsMaleorFemale] [bit] NOT NULL,
	[BirthDate] [datetime2](7) NULL,
	[CreateOn] [datetime2](7) NULL,
	[ModifieldOn] [datetime2](7) NULL,
	[IsActive] [bit] NOT NULL,
	[PhotoUrl] [nvarchar](max) NULL,
	[DocumentUrl] [nvarchar](max) NULL,
	[VideoUrl] [nvarchar](max) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ManageDesig]    Script Date: 15-12-2024 18:42:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ManageDesig](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DepartmentId] [int] NULL,
	[DesignationId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[auth_action] ON 

INSERT [dbo].[auth_action] ([id], [action]) VALUES (3, N'Add')
INSERT [dbo].[auth_action] ([id], [action]) VALUES (5, N'Delete')
INSERT [dbo].[auth_action] ([id], [action]) VALUES (6, N'Download')
INSERT [dbo].[auth_action] ([id], [action]) VALUES (4, N'Edit')
INSERT [dbo].[auth_action] ([id], [action]) VALUES (1, N'List')
INSERT [dbo].[auth_action] ([id], [action]) VALUES (7, N'Upload')
INSERT [dbo].[auth_action] ([id], [action]) VALUES (2, N'View')
SET IDENTITY_INSERT [dbo].[auth_action] OFF
GO
SET IDENTITY_INSERT [dbo].[auth_form_mas] ON 

INSERT [dbo].[auth_form_mas] ([Id], [formid], [form_name], [form_link], [model_id], [form_st]) VALUES (3, N'Department', N'Department', N'', N'Model', 1)
INSERT [dbo].[auth_form_mas] ([Id], [formid], [form_name], [form_link], [model_id], [form_st]) VALUES (2, N'Designation', N'Designation', N'', N'Model', 1)
INSERT [dbo].[auth_form_mas] ([Id], [formid], [form_name], [form_link], [model_id], [form_st]) VALUES (1, N'Employee', N'Employee', N'', N'Model', 1)
SET IDENTITY_INSERT [dbo].[auth_form_mas] OFF
GO
SET IDENTITY_INSERT [dbo].[auth_form_mas_action] ON 

INSERT [dbo].[auth_form_mas_action] ([Id], [FormId], [ActionId]) VALUES (9, N'Designation', N'List')
INSERT [dbo].[auth_form_mas_action] ([Id], [FormId], [ActionId]) VALUES (10, N'Designation', N'View')
INSERT [dbo].[auth_form_mas_action] ([Id], [FormId], [ActionId]) VALUES (6, N'Designation', N'Add')
INSERT [dbo].[auth_form_mas_action] ([Id], [FormId], [ActionId]) VALUES (8, N'Designation', N'Edit')
INSERT [dbo].[auth_form_mas_action] ([Id], [FormId], [ActionId]) VALUES (7, N'Designation', N'Delete')
INSERT [dbo].[auth_form_mas_action] ([Id], [FormId], [ActionId]) VALUES (4, N'Department', N'List')
INSERT [dbo].[auth_form_mas_action] ([Id], [FormId], [ActionId]) VALUES (5, N'Department', N'View')
INSERT [dbo].[auth_form_mas_action] ([Id], [FormId], [ActionId]) VALUES (15, N'Employee', N'List')
INSERT [dbo].[auth_form_mas_action] ([Id], [FormId], [ActionId]) VALUES (17, N'Employee', N'View')
INSERT [dbo].[auth_form_mas_action] ([Id], [FormId], [ActionId]) VALUES (11, N'Employee', N'Add')
INSERT [dbo].[auth_form_mas_action] ([Id], [FormId], [ActionId]) VALUES (14, N'Employee', N'Edit')
INSERT [dbo].[auth_form_mas_action] ([Id], [FormId], [ActionId]) VALUES (12, N'Employee', N'Delete')
INSERT [dbo].[auth_form_mas_action] ([Id], [FormId], [ActionId]) VALUES (13, N'Employee', N'Download')
INSERT [dbo].[auth_form_mas_action] ([Id], [FormId], [ActionId]) VALUES (16, N'Employee', N'Upload')
INSERT [dbo].[auth_form_mas_action] ([Id], [FormId], [ActionId]) VALUES (1, N'Department', N'Add')
INSERT [dbo].[auth_form_mas_action] ([Id], [FormId], [ActionId]) VALUES (3, N'Department', N'Edit')
INSERT [dbo].[auth_form_mas_action] ([Id], [FormId], [ActionId]) VALUES (2, N'Department', N'Delete')
INSERT [dbo].[auth_form_mas_action] ([Id], [FormId], [ActionId]) VALUES (19, N'test', N'Add')
INSERT [dbo].[auth_form_mas_action] ([Id], [FormId], [ActionId]) VALUES (29, N'test', N'List')
INSERT [dbo].[auth_form_mas_action] ([Id], [FormId], [ActionId]) VALUES (30, N'test', N'View')
SET IDENTITY_INSERT [dbo].[auth_form_mas_action] OFF
GO
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'ACCOUNT', N'ACCOUNT PANNEL', 1)
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'ADMINISTRATION', N'ADMINISTRATION', 1)
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'CATALOG', N'CATALOG', 1)
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'COMMUNICATION', N'COMMUNICATION', 1)
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'CUSTOMERS', N'CUSTOMERS', 1)
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'DISCOUNT', N'Discount', 1)
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'GRAPHICS', N'GRAPHICS', 1)
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'GST', N'GST Report', 1)
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'MARKETPLACE', N'MARKETPLACE', 1)
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'MASTERS', N'MASTERS', 1)
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'ORDERS', N'ORDERS', 1)
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'PAYMENT', N'PAYMENT', 1)
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'ProductD.Templates', N'Product D. Templates', 1)
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'ProductDetailManage', N'Product Detail Manage', 1)
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'RECEIPT', N'RECEIPT', 1)
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'REPORTS', N'REPORTS', 1)
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'SERVICES', N'SERVICES', 1)
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'SHIPPING', N'SHIPPING', 1)
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'STOCK', N'STOCK', 1)
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'TOOLS', N'Tools', 1)
INSERT [dbo].[auth_model_mas] ([model_id], [model_name], [model_st]) VALUES (N'TRANSACTIONS', N'TRANSACTIONS', 1)
GO
SET IDENTITY_INSERT [dbo].[auth_omgrk] ON 

INSERT [dbo].[auth_omgrk] ([id], [username], [password]) VALUES (2, N'omgrk', N'omg_computer@')
SET IDENTITY_INSERT [dbo].[auth_omgrk] OFF
GO
SET IDENTITY_INSERT [dbo].[auth_profile_form_action] ON 

INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (28, N'Admin', N'Department', N'Add')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (31, N'Admin', N'Department', N'Delete')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (29, N'Admin', N'Department', N'Edit')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (26, N'Admin', N'Department', N'List')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (27, N'Admin', N'Department', N'View')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (1, N'Admin', N'Designation', N'Add')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (2, N'Admin', N'Designation', N'Delete')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (3, N'Admin', N'Designation', N'Edit')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (4, N'Admin', N'Designation', N'List')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (5, N'Admin', N'Designation', N'View')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (6, N'Admin', N'Employee', N'Add')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (7, N'Admin', N'Employee', N'Delete')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (8, N'Admin', N'Employee', N'Download')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (9, N'Admin', N'Employee', N'Edit')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (10, N'Admin', N'Employee', N'List')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (11, N'Admin', N'Employee', N'Upload')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (12, N'Admin', N'Employee', N'View')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (35, N'User', N'Department', N'Add')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (33, N'User', N'Department', N'List')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (34, N'User', N'Department', N'View')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (13, N'User', N'Designation', N'Add')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (14, N'User', N'Designation', N'List')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (15, N'User', N'Designation', N'View')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (16, N'User', N'Employee', N'Add')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (17, N'User', N'Employee', N'Download')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (18, N'User', N'Employee', N'List')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (19, N'User', N'Employee', N'Upload')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (20, N'User', N'Employee', N'View')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (21, N'User', N'test', N'List')
INSERT [dbo].[auth_profile_form_action] ([Id], [ProfileId], [FormId], [ActionId]) VALUES (23, N'User', N'test', N'View')
SET IDENTITY_INSERT [dbo].[auth_profile_form_action] OFF
GO
SET IDENTITY_INSERT [dbo].[auth_profile_mas] ON 

INSERT [dbo].[auth_profile_mas] ([Id], [profileid], [profile_name], [profile_desc], [profile_st]) VALUES (1, N'Admin', N'Admin', NULL, 1)
INSERT [dbo].[auth_profile_mas] ([Id], [profileid], [profile_name], [profile_desc], [profile_st]) VALUES (2, N'DeleteOperator', N'Delete Operator', NULL, 1)
INSERT [dbo].[auth_profile_mas] ([Id], [profileid], [profile_name], [profile_desc], [profile_st]) VALUES (3, N'EditOperator', N'Edit Operator', NULL, 1)
INSERT [dbo].[auth_profile_mas] ([Id], [profileid], [profile_name], [profile_desc], [profile_st]) VALUES (4, N'Manager', N'Manager', NULL, 1)
INSERT [dbo].[auth_profile_mas] ([Id], [profileid], [profile_name], [profile_desc], [profile_st]) VALUES (5, N'Operator', N'Operator', NULL, 1)
INSERT [dbo].[auth_profile_mas] ([Id], [profileid], [profile_name], [profile_desc], [profile_st]) VALUES (6, N'Seller', N'Seller', NULL, 1)
INSERT [dbo].[auth_profile_mas] ([Id], [profileid], [profile_name], [profile_desc], [profile_st]) VALUES (7, N'User', N'User', NULL, 1)
SET IDENTITY_INSERT [dbo].[auth_profile_mas] OFF
GO
SET IDENTITY_INSERT [dbo].[auth_user] ON 

INSERT [dbo].[auth_user] ([Srno], [userid], [Com_Code], [user_type], [mobile], [email], [username], [passwd], [api_passwd_key], [name], [last_name], [profileid], [login_status], [login_date], [logout_date], [st], [Profile_Passw_St], [PhotoUrl]) VALUES (1, N'USER1', N'admin', N'Admin', NULL, N'rinkesh@test.com', N'rinkesh@test.com', N'123', NULL, N'', NULL, N'Admin', 0, NULL, NULL, 1, NULL, N'https://apiforangulartest.omss.in/images/USER1-021220240138384234761cc229c5-95a5-4d0f-9f8a-5463f92bbf5d.jpg')
INSERT [dbo].[auth_user] ([Srno], [userid], [Com_Code], [user_type], [mobile], [email], [username], [passwd], [api_passwd_key], [name], [last_name], [profileid], [login_status], [login_date], [logout_date], [st], [Profile_Passw_St], [PhotoUrl]) VALUES (2, N'USER2', N'admin', N'User', NULL, N'user@test.com', N'user@test.com', N'123', NULL, N'', NULL, N'User', 0, NULL, NULL, 1, NULL, N'https://apiforangulartest.omss.in/images/USER2-261120242146480443861d1faaeb-7bbb-4293-ad87-66d274dda4a0.jpg')
INSERT [dbo].[auth_user] ([Srno], [userid], [Com_Code], [user_type], [mobile], [email], [username], [passwd], [api_passwd_key], [name], [last_name], [profileid], [login_status], [login_date], [logout_date], [st], [Profile_Passw_St], [PhotoUrl]) VALUES (3, N'USER3', N'admin', N'User', NULL, N'user2@test.com', N'user2@test.com', N'123', NULL, N'', NULL, N'User', 0, NULL, NULL, 1, NULL, NULL)
INSERT [dbo].[auth_user] ([Srno], [userid], [Com_Code], [user_type], [mobile], [email], [username], [passwd], [api_passwd_key], [name], [last_name], [profileid], [login_status], [login_date], [logout_date], [st], [Profile_Passw_St], [PhotoUrl]) VALUES (13, N'USER4', N'admin', N'User', NULL, N'user3@test.com', N'user3@test.com', N'123', NULL, N'', NULL, N'User', 0, NULL, NULL, 1, NULL, N'https://apiforangulartest.omss.in/images/USER4-18112024220032634341becd84d6-ddf8-413b-89d6-49dd9b3fc667.jpg')
SET IDENTITY_INSERT [dbo].[auth_user] OFF
GO
SET IDENTITY_INSERT [dbo].[auth_user_profile_action] ON 

INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (1, N'USER1', N'Admin', N'Designation', N'Add')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (2, N'USER1', N'Admin', N'Designation', N'Delete')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (3, N'USER1', N'Admin', N'Designation', N'Edit')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (4, N'USER1', N'Admin', N'Designation', N'List')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (5, N'USER1', N'Admin', N'Designation', N'View')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (6, N'USER1', N'Admin', N'Employee', N'Add')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (7, N'USER1', N'Admin', N'Employee', N'Delete')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (8, N'USER1', N'Admin', N'Employee', N'Download')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (9, N'USER1', N'Admin', N'Employee', N'Edit')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (10, N'USER1', N'Admin', N'Employee', N'List')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (11, N'USER1', N'Admin', N'Employee', N'Upload')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (12, N'USER1', N'Admin', N'Employee', N'View')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (13, N'USER2', N'User', N'Designation', N'Add')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (14, N'USER2', N'User', N'Designation', N'List')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (15, N'USER2', N'User', N'Designation', N'View')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (16, N'USER2', N'User', N'Employee', N'Add')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (17, N'USER2', N'User', N'Employee', N'Download')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (18, N'USER2', N'User', N'Employee', N'List')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (19, N'USER2', N'User', N'Employee', N'Upload')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (20, N'USER2', N'User', N'Employee', N'View')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (1002, N'USER3', N'User', N'Designation', N'Add')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (1003, N'USER3', N'User', N'Designation', N'List')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (1004, N'USER3', N'User', N'Designation', N'View')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (1005, N'USER3', N'User', N'Employee', N'Add')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (1006, N'USER3', N'User', N'Employee', N'Download')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (1007, N'USER3', N'User', N'Employee', N'List')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (1008, N'USER3', N'User', N'Employee', N'Upload')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (1009, N'USER3', N'User', N'Employee', N'View')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (1018, N'USER4', N'User', N'Designation', N'Add')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (1019, N'USER4', N'User', N'Designation', N'List')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (1020, N'USER4', N'User', N'Designation', N'View')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (1021, N'USER4', N'User', N'Employee', N'Add')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (1022, N'USER4', N'User', N'Employee', N'Download')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (1023, N'USER4', N'User', N'Employee', N'List')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (1024, N'USER4', N'User', N'Employee', N'Upload')
INSERT [dbo].[auth_user_profile_action] ([id], [UserId], [ProfileId], [FormId], [ActionId]) VALUES (1025, N'USER4', N'User', N'Employee', N'View')
SET IDENTITY_INSERT [dbo].[auth_user_profile_action] OFF
GO
SET IDENTITY_INSERT [dbo].[Department] ON 

INSERT [dbo].[Department] ([Id], [DepartmentName]) VALUES (5, N'Account')
INSERT [dbo].[Department] ([Id], [DepartmentName]) VALUES (6, N'Development')
INSERT [dbo].[Department] ([Id], [DepartmentName]) VALUES (7, N'Human Resource')
INSERT [dbo].[Department] ([Id], [DepartmentName]) VALUES (15, N'test')
SET IDENTITY_INSERT [dbo].[Department] OFF
GO
SET IDENTITY_INSERT [dbo].[Designation] ON 

INSERT [dbo].[Designation] ([Id], [DesignationName]) VALUES (8, N'aa')
INSERT [dbo].[Designation] ([Id], [DesignationName]) VALUES (2, N'Accountant')
INSERT [dbo].[Designation] ([Id], [DesignationName]) VALUES (3, N'Development')
INSERT [dbo].[Designation] ([Id], [DesignationName]) VALUES (7, N'gg')
INSERT [dbo].[Designation] ([Id], [DesignationName]) VALUES (1, N'Manager')
INSERT [dbo].[Designation] ([Id], [DesignationName]) VALUES (10, N'rinkesh')
INSERT [dbo].[Designation] ([Id], [DesignationName]) VALUES (11, N'sssss')
INSERT [dbo].[Designation] ([Id], [DesignationName]) VALUES (5, N'test')
INSERT [dbo].[Designation] ([Id], [DesignationName]) VALUES (4, N'test2-update')
INSERT [dbo].[Designation] ([Id], [DesignationName]) VALUES (6, N'tet')
INSERT [dbo].[Designation] ([Id], [DesignationName]) VALUES (9, N'tttt')
SET IDENTITY_INSERT [dbo].[Designation] OFF
GO
SET IDENTITY_INSERT [dbo].[Employee] ON 

INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (13, N'Rinkesh', N'Gola', 2, N'rinkesh@gmail.com', NULL, N'123', 1, CAST(N'2024-10-25T14:26:03.8890000' AS DateTime2), CAST(N'2024-10-25T14:26:03.8890000' AS DateTime2), CAST(N'2024-12-01T19:43:27.0730000' AS DateTime2), 1, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (14, N'Manish', N'Kumar', 1, N'manish@gmail.com', N'87898748797', N'123', 1, CAST(N'2024-10-25T14:26:03.8890000' AS DateTime2), CAST(N'2024-10-25T14:26:03.8890000' AS DateTime2), CAST(N'2024-10-25T14:26:03.8890000' AS DateTime2), 1, N'string', N'string', N'string')
INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (15, N'Sanjay', N'Gola', 1, N'sanjay@gmail.com', N'87898118797', N'123', 1, CAST(N'2024-10-25T14:26:03.8890000' AS DateTime2), CAST(N'2024-10-25T14:26:03.8890000' AS DateTime2), CAST(N'2024-10-25T14:26:03.8890000' AS DateTime2), 1, N'string', N'string', N'string')
INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (16, N'Vinod', N'Kumar', 1, N'sanjay@gmail.com', N'87898118797', N'123', 1, CAST(N'2024-10-25T14:26:03.8890000' AS DateTime2), CAST(N'2024-10-25T14:26:03.8890000' AS DateTime2), CAST(N'2024-10-25T14:26:03.8890000' AS DateTime2), 1, N'string', N'string', N'string')
INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (17, N'Rinkesh1', N'Gola1', 1, N'rinkeshgolapr1@gmail.com', N'9027581975', N'123', 1, CAST(N'1993-10-26T00:00:00.0000000' AS DateTime2), CAST(N'2024-10-26T13:38:44.4510000' AS DateTime2), CAST(N'2024-10-26T13:38:44.4510000' AS DateTime2), 1, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (18, N'Vinod', N'Kumar', 1, N'vinod@test.com', N'6786786787', N'123', 1, CAST(N'2000-10-30T00:00:00.0000000' AS DateTime2), CAST(N'2024-10-30T09:32:30.8420000' AS DateTime2), CAST(N'2024-10-30T09:32:30.8420000' AS DateTime2), 1, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (19, N'Akhilesh', N'Kumar', 2, N'akhilesh@test.com', N'3231231231', N'123', 1, CAST(N'2000-11-01T00:00:00.0000000' AS DateTime2), CAST(N'2024-11-01T09:37:01.8550000' AS DateTime2), CAST(N'2024-12-15T05:42:12.3610000' AS DateTime2), 1, N'https://apiforangulartest.omss.in/images/19-0212202401485355863915589656-284e-4b2b-a1dc-51d34ecaf6a3.jpg', NULL, NULL)
INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (20, N'test', N'test', 1, N'dfsdf@dfd.gg', N'4342434334', N'123', 1, CAST(N'2024-11-12T16:48:39.6420000' AS DateTime2), CAST(N'2024-11-12T16:48:39.6420000' AS DateTime2), CAST(N'2024-11-30T11:25:37.6870000' AS DateTime2), 1, N'https://apiforangulartest.omss.in/images/20-301120241655530410294c782516-f228-4c7e-ad8c-9f440e898f63.jpg', NULL, NULL)
INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (21, N'string', N'string', 0, N'string', N'string', N'string', 1, CAST(N'2024-11-13T12:00:46.5800000' AS DateTime2), CAST(N'2024-11-13T12:00:46.5800000' AS DateTime2), CAST(N'2024-11-13T12:00:46.5800000' AS DateTime2), 1, N'string', N'string', N'string')
INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (23, N'test3', N'test', 1, N'test3@gam.com', N'9878798798', N'123', 1, CAST(N'2024-11-14T11:07:33.4490000' AS DateTime2), CAST(N'2024-11-14T11:07:33.4490000' AS DateTime2), CAST(N'2024-11-14T11:07:33.4490000' AS DateTime2), 1, N'string', N'string', N'string')
INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (1022, N'test11', N'last11', 2, N'test11@ff.com', NULL, N'123', 1, CAST(N'1990-11-15T00:00:00.0000000' AS DateTime2), CAST(N'2024-11-15T01:41:48.2700000' AS DateTime2), CAST(N'2024-11-15T01:51:33.8880000' AS DateTime2), 1, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (1023, N'test112', N'last', 1, N'test112@dfdf.com', N'4234242432', N'123', 1, CAST(N'2006-11-15T00:00:00.0000000' AS DateTime2), CAST(N'2024-11-15T01:52:28.3060000' AS DateTime2), CAST(N'2024-11-15T01:52:48.3810000' AS DateTime2), 1, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (1026, N'test30-1', N'last', 1, N'test301@test.com', N'7897978787', N'123', 1, CAST(N'2005-11-30T00:00:00.0000000' AS DateTime2), CAST(N'2024-11-30T10:26:18.6100000' AS DateTime2), CAST(N'2024-11-30T10:26:18.6100000' AS DateTime2), 1, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (1027, N'Test30-2', N'Singh', 1, N'test302@test.com', N'3423423423', N'123', 0, CAST(N'1993-11-29T00:00:00.0000000' AS DateTime2), CAST(N'2024-11-30T11:27:07.3600000' AS DateTime2), CAST(N'2024-11-30T11:27:44.6260000' AS DateTime2), 1, N'https://apiforangulartest.omss.in/images/1027-30112024165745601829cc6ae491-3d0a-40c7-be24-9bb08e888afd.jpg', NULL, NULL)
INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (1028, N'Rinkesh', N'Gola', 1, N'rinkeshgolapr@gmail.com', N'9027581975', N'123', 1, CAST(N'2024-12-02T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-01T19:37:41.6640000' AS DateTime2), CAST(N'2024-12-01T19:37:41.6640000' AS DateTime2), 1, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (1029, N'Rinkesh11', N'Gola', 1, N'rinkeshgolapr@gmail.com', NULL, N'123', 1, CAST(N'2024-11-28T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-01T19:41:07.8300000' AS DateTime2), CAST(N'2024-12-01T19:41:07.8300000' AS DateTime2), 1, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (1030, N'test131224-1', N'Gola', 5, N'test131224@gmail.com', NULL, N'123', 1, CAST(N'2001-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T02:37:05.8320000' AS DateTime2), CAST(N'2024-12-13T02:47:23.7330000' AS DateTime2), 1, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (1031, N'test131224-2', N'Gola', 3, N'test131224-2@gmail.com', NULL, N'123', 1, CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T02:38:05.6490000' AS DateTime2), CAST(N'2024-12-13T02:38:05.6490000' AS DateTime2), 1, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (1032, N'test131224-3', N'Gola', 0, N'test131224-3@gmail.com', NULL, N'123', 1, CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T02:44:01.6160000' AS DateTime2), CAST(N'2024-12-13T02:44:01.6160000' AS DateTime2), 1, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (1033, N'test131224-3', N'gg', 5, N'test131224-3', NULL, N'123', 1, CAST(N'2024-12-13T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-13T02:45:58.4570000' AS DateTime2), CAST(N'2024-12-13T02:45:58.4570000' AS DateTime2), 1, NULL, NULL, NULL)
INSERT [dbo].[Employee] ([UserId], [FirstName], [LastName], [DesignationId], [EmailId], [Mobile], [Password], [IsMaleorFemale], [BirthDate], [CreateOn], [ModifieldOn], [IsActive], [PhotoUrl], [DocumentUrl], [VideoUrl]) VALUES (1034, N'tests', N'df', 3, N'dfdf@tsds.com', N'1212112122', N'123', 1, CAST(N'2013-12-15T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-15T02:24:39.5940000' AS DateTime2), CAST(N'2024-12-15T02:24:39.5940000' AS DateTime2), 1, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Employee] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [unique_key_action]    Script Date: 15-12-2024 18:42:42 ******/
ALTER TABLE [dbo].[auth_action] ADD  CONSTRAINT [unique_key_action] UNIQUE NONCLUSTERED 
(
	[action] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_auth_form_mas]    Script Date: 15-12-2024 18:42:42 ******/
ALTER TABLE [dbo].[auth_form_mas] ADD  CONSTRAINT [IX_auth_form_mas] UNIQUE NONCLUSTERED 
(
	[form_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uniqueKey_auth_form_masFormId]    Script Date: 15-12-2024 18:42:42 ******/
ALTER TABLE [dbo].[auth_form_mas] ADD  CONSTRAINT [uniqueKey_auth_form_masFormId] UNIQUE NONCLUSTERED 
(
	[formid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uniqueKey_auth_form_masFormName]    Script Date: 15-12-2024 18:42:42 ******/
ALTER TABLE [dbo].[auth_form_mas] ADD  CONSTRAINT [uniqueKey_auth_form_masFormName] UNIQUE NONCLUSTERED 
(
	[form_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [PK_auth_form_mas_action]    Script Date: 15-12-2024 18:42:42 ******/
ALTER TABLE [dbo].[auth_form_mas_action] ADD  CONSTRAINT [PK_auth_form_mas_action] UNIQUE NONCLUSTERED 
(
	[FormId] ASC,
	[ActionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uniqueKey_auth_form_mas_action]    Script Date: 15-12-2024 18:42:42 ******/
ALTER TABLE [dbo].[auth_form_mas_action] ADD  CONSTRAINT [uniqueKey_auth_form_mas_action] UNIQUE NONCLUSTERED 
(
	[FormId] ASC,
	[ActionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_auth_model_mas]    Script Date: 15-12-2024 18:42:42 ******/
ALTER TABLE [dbo].[auth_model_mas] ADD  CONSTRAINT [IX_auth_model_mas] UNIQUE NONCLUSTERED 
(
	[model_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_auth_omgrk]    Script Date: 15-12-2024 18:42:42 ******/
ALTER TABLE [dbo].[auth_omgrk] ADD  CONSTRAINT [IX_auth_omgrk] UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [uniqueKey_auth_profile_form_action]    Script Date: 15-12-2024 18:42:42 ******/
ALTER TABLE [dbo].[auth_profile_form_action] ADD  CONSTRAINT [uniqueKey_auth_profile_form_action] UNIQUE NONCLUSTERED 
(
	[ProfileId] ASC,
	[FormId] ASC,
	[ActionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_auth_profile_mas_id]    Script Date: 15-12-2024 18:42:42 ******/
ALTER TABLE [dbo].[auth_profile_mas] ADD  CONSTRAINT [IX_auth_profile_mas_id] UNIQUE NONCLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_auth_profile_master]    Script Date: 15-12-2024 18:42:42 ******/
ALTER TABLE [dbo].[auth_profile_mas] ADD  CONSTRAINT [IX_auth_profile_master] UNIQUE NONCLUSTERED 
(
	[profile_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_auth_user]    Script Date: 15-12-2024 18:42:42 ******/
ALTER TABLE [dbo].[auth_user] ADD  CONSTRAINT [IX_auth_user] UNIQUE NONCLUSTERED 
(
	[Srno] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_user_mas]    Script Date: 15-12-2024 18:42:42 ******/
ALTER TABLE [dbo].[auth_user] ADD  CONSTRAINT [IX_user_mas] UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UNIQ_auth_user_profile_action]    Script Date: 15-12-2024 18:42:42 ******/
ALTER TABLE [dbo].[auth_user_profile_action] ADD  CONSTRAINT [UNIQ_auth_user_profile_action] UNIQUE NONCLUSTERED 
(
	[UserId] ASC,
	[ProfileId] ASC,
	[FormId] ASC,
	[ActionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UniqueKey_Department_DepartmentName]    Script Date: 15-12-2024 18:42:42 ******/
ALTER TABLE [dbo].[Department] ADD  CONSTRAINT [UniqueKey_Department_DepartmentName] UNIQUE NONCLUSTERED 
(
	[DepartmentName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UniqueKey_Designation_DesignationName]    Script Date: 15-12-2024 18:42:42 ******/
ALTER TABLE [dbo].[Designation] ADD  CONSTRAINT [UniqueKey_Designation_DesignationName] UNIQUE NONCLUSTERED 
(
	[DesignationName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UK_DepartmentId]    Script Date: 15-12-2024 18:42:42 ******/
ALTER TABLE [dbo].[ManageDesig] ADD  CONSTRAINT [UK_DepartmentId] UNIQUE NONCLUSTERED 
(
	[DepartmentId] ASC,
	[DesignationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[usp_EmployeeDetails]    Script Date: 15-12-2024 18:42:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE proc [dbo].[usp_EmployeeDetails]    
@UserId int=0,    
@FirstName nvarchar(50)='',
@LastName nvarchar(50)='',
@DesignationName nvarchar(50)='',
@EmailId nvarchar(100)='',
@pageindex int=1,     
@pagesize int=100,    
@totalcount int=0 out    
as    
begin    

	select 	cast((row_number() over(order by u.FirstName asc))as int) as RowNo,u.UserId, u.FirstName, u.LastName, u.EmailId, u.Password, 
	u.IsMaleorFemale, u.BirthDate, u.CreateOn, u.ModifieldOn, u.IsActive, u.DesignationId, d.DesignationName
	into #temp_inc
	from Employee u left join Designation_Master d on u.DesignationId = d.DesignationId
	where (@UserId=0 or u.UserId=@UserId) 
		and (@FirstName='' or u.FirstName like '%'+@FirstName+'%')
		and (@LastName='' or u.LastName like '%'+@LastName+'%')
		and (@EmailId='' or u.EmailId like '%'+@EmailId+'%')
		and (@DesignationName='' or d.DesignationName like '%'+@DesignationName+'%')
	order by u.FirstName asc 
    
 
  --get #temp table   
  select * from #temp_inc order by RowNo  
  offset ((@pageindex-1)*@pagesize) rows fetch next  @pagesize rows only    
   --total records count  
  set @totalcount=(select count(1) from #temp_inc)  
    
  drop table #temp_inc  
end      



GO
