# Coin Gecko internship interview question

## Interview Questions's Answer CoinGecko

1. We can accomplish that using a linked list. When initializing an array, the computer allocates a certain size of memory that holds value, thus making the size immutable. For link list, when initialize, it only allocates a memory that is the size of a pointer. When we want to add an element to the linked list, a memory of size ( element size + pointer ) was allocated and the pointer of this new memory was stored in the first "block" of the link list, then when you want to add another element again, do the same thing but the pointer for the new element is stored into the last empty pointer "space" that at the block before. Then you can continuously add more and more elements without limit to the array, and when you want to end it, you just make the last pointer point to a null.

2. The operation count of this block of code is the product of `size` and `size` as we can see, for every size, it loop through the size again. Thus, the relationship between the input size and operation count is quadratic, which in turn means that the Big-O notation of this block of code is O(n^2).

3. First, we need to know if it was the failure of fetching the list of item that is on sale, or failure of rendering out. I will probably start by hard coding relevant data inside the place where data input is expected and see if the website can display the result. If not, I can conclude that the point of failure is at fetching the list of items. Then I will start to check what is wrong with the fetched data, or if the website is even fetching the data, I will console.log out the place where I expect the data that get fetched and check if the data is present or the data was fetched but it was in the wrong type/structure.

4. No, it's not fair to say that all software should be written in C/C++. Although languages like C and C++ have much much better runtime performance compare to their interpreted counterpart. Writing large scale application in C or even C++ is tedious, lots of manual resource management need to be considered and severe lack of ready-made modern function which will greatly hinder the speed where features and product can be developed. For some application such as a landing page, a user won't be noticing the difference between a 0.01 second load time and a 0.00001 second load time even if it was 1000X faster, thus writing this kind of application using C or C++ instead of a language with better framework support like Java is unnecessary and waste of resources. Other than that, some language such as Javascript has a massive amount of library that supports various modern function like AJAX for asynchronous task which was important for web dev. In the end, the language and framework to write a piece of software should be determined on what the software tries to achieve instead of purely speed.

## Coding Assigment

Completed all tasks, plus all bonus tasks
[link](https://fir-playground-ca007.web.app/)
