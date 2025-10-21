import React from "react";
const Radio = () => {
    return (
        <div class="flex gap-10">
            <div class="inline-flex items-center">
                <label class="relative flex items-center cursor-pointer" for="slate-800">
                    <input
                        name="color"
                        type="radio"
                        class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                        id="slate-800"
                        checked
                    />
                    <span class="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </label>
            </div>

            <div class="inline-flex items-center">
                <label class="relative flex items-center cursor-pointer" for="slate-400">
                    <input
                        name="color"
                        type="radio"
                        class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                        id="slate-400"
                    />
                    <span class="absolute bg-slate-400 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </label>
            </div>

            <div class="inline-flex items-center">
                <label class="relative flex items-center cursor-pointer" for="blue-600">
                    <input
                        name="color"
                        type="radio"
                        class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-blue-400 transition-all"
                        id="blue-600"
                    />
                    <span class="absolute bg-blue-600 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </label>
            </div>

            <div class="inline-flex items-center">
                <label class="relative flex items-center cursor-pointer" for="green-600">
                    <input
                        name="color"
                        type="radio"
                        class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-green-400 transition-all"
                        id="green-600"
                    />
                    <span class="absolute bg-green-600 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </label>
            </div>

            <div class="inline-flex items-center">
                <label class="relative flex items-center cursor-pointer" for="red-600">
                    <input
                        name="color"
                        type="radio"
                        class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-red-400 transition-all"
                        id="red-600"
                    />
                    <span class="absolute bg-red-600 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </label>
            </div>

            <div class="inline-flex items-center">
                <label class="relative flex items-center cursor-pointer" for="amber-600">
                    <input
                        name="color"
                        type="radio"
                        class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-amber-400 transition-all"
                        id="amber-600"
                    />
                    <span class="absolute bg-amber-600 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </label>
            </div>

            <div class="inline-flex items-center">
                <label class="relative flex items-center cursor-pointer" for="purple-600">
                    <input
                        name="color"
                        type="radio"
                        class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-purple-400 transition-all"
                        id="purple-600"
                    />
                    <span class="absolute bg-purple-600 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </label>
            </div>
        </div>
    );
}
export default Radio;
