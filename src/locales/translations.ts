export const translations = {
  en: {
    // Navigation & Pages
    registrationForm: 'Registration Form',
    usersTable: 'Users Table',
    bueSystem: 'BUE System',

    // Form Labels
    personalInformation: 'Personal Information',
    usePermAddress: 'Use a permanent address where you can receive mail.',
    name: 'Name',
    emailAddress: 'Email address',
    phoneNumber: 'Phone number',
    age: 'Age',

    // Buttons
    refresh: 'Refresh',
    search: 'Search',
    clear: 'Clear',
    save: 'Save',
    saving: 'Saving...',
    loading: 'Loading...',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    update: 'Update',
    updating: 'Updating...',

    // Messages
    registrationSuccessful: 'Registration successful!',
    userUpdatedSuccessfully: 'User updated successfully!',
    userDeletedSuccessfully: 'User with email {email} deleted successfully!',
    loadingUsers: 'Loading users...',
    noUsers: 'No users found.',
    noUsersFound: 'No users found.',
    displayingAllUsers: 'Displaying all registered users.',
    searchResults: 'Search results',
    searchByEmail: 'Search by email...',

    // Modal
    editUser: 'Edit User',
    usersList: 'Users List',
    id: 'ID',
    action: 'Action',
    actions: 'Actions',

    // Validation & Errors
    pleaseFixFields: 'Please fix the highlighted fields:',
    validationError: 'Some details aren\'t valid. Please check and try again.',
    userNotFound: 'We couldn\'t find the item you requested.',
    recordExists: 'This record already exists. Try a different value.',
    serverError: 'We\'re having trouble on our side. Please try again later.',
    errorOccurred: 'Something went wrong. Please try again.',
    cantReachServer: 'Can\'t reach the server. Check your internet or ensure the backend is running.',
    corsError: 'Connection blocked (CORS). Please allow http://localhost:5173 on the server.',
    couldNotComplete: 'We couldn\'t complete your request. Please try again.',

    // Delete confirmation
    confirmDelete: 'Are you sure you want to delete the user with email: {email}?',
  },
  ar: {
    // Navigation & Pages
    registrationForm: 'نموذج التسجيل',
    usersTable: 'جدول المستخدمين',
    bueSystem: 'نظام BUE',

    // Form Labels
    personalInformation: 'المعلومات الشخصية',
    usePermAddress: 'استخدم عنوانًا دائمًا حيث يمكنك استقبال البريد.',
    name: 'الاسم',
    emailAddress: 'عنوان البريد الإلكتروني',
    phoneNumber: 'رقم الهاتف',
    age: 'العمر',

    // Buttons
    refresh: 'تحديث',
    search: 'بحث',
    clear: 'مسح',
    save: 'حفظ',
    saving: 'جارٍ الحفظ...',
    loading: 'جارٍ التحميل...',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    update: 'تحديث',
    updating: 'جارٍ التحديث...',

    // Messages
    registrationSuccessful: 'تم التسجيل بنجاح!',
    userUpdatedSuccessfully: 'تم تحديث المستخدم بنجاح!',
    userDeletedSuccessfully: 'تم حذف المستخدم برسالة البريد الإلكتروني {email} بنجاح!',
    loadingUsers: 'جارٍ تحميل المستخدمين...',
    noUsers: 'لم يتم العثور على مستخدمين.',
    noUsersFound: 'لم يتم العثور على مستخدمين.',
    displayingAllUsers: 'عرض جميع المستخدمين المسجلين.',
    searchResults: 'نتائج البحث',
    searchByEmail: 'البحث حسب البريد الإلكتروني...',

    // Modal
    editUser: 'تعديل المستخدم',
    usersList: 'قائمة المستخدمين',
    id: 'المعرف',
    action: 'الإجراء',
    actions: 'الإجراءات',

    // Validation & Errors
    pleaseFixFields: 'يرجى إصلاح الحقول المميزة:',
    validationError: 'بعض التفاصيل غير صحيحة. يرجى التحقق والمحاولة مرة أخرى.',
    userNotFound: 'لم نتمكن من العثور على العنصر الذي طلبته.',
    recordExists: 'هذا السجل موجود بالفعل. جرب قيمة مختلفة.',
    serverError: 'نواجه مشكلة من جانبنا. يرجى محاولة لاحقًا.',
    errorOccurred: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
    cantReachServer: 'لا يمكن الوصول إلى الخادم. تحقق من اتصالك بالإنترنت أو تأكد من تشغيل الخادم الخلفي.',
    corsError: 'تم حظر الاتصال (CORS). يرجى السماح بـ http://localhost:5173 على الخادم.',
    couldNotComplete: 'لم نتمكن من إكمال طلبك. يرجى المحاولة مرة أخرى.',

    // Delete confirmation
    confirmDelete: 'هل أنت متأكد من رغبتك في حذف المستخدم برسالة البريد الإلكتروني: {email}؟',
  }
};

export type Language = 'en' | 'ar';
