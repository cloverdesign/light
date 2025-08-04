'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'motion/react';
import React from 'react';

const Donations = () => {
    const [amount, setAmount] = React.useState('');

    return (
        <section className="pt-[150px] pb-20 font-body flex flex-col items-center gap-8">
            <div className="overflow-y-hidden text-center">
                <motion.h1
                    data-animate="heading1"
                    initial={{ y: '100%' }}
                    whileInView={{ y: 0 }}
                    className="text-[35px] leading-[48px] lg:text-[56px] lg:leading-[72px]"
                >
                    <span className="relative inline-block mr-5 w-fit h-fit mt-6 ml-6">
                        Give with Purpose
                    </span>
                </motion.h1>
                <p className="text-base mt-4 max-w-xl mx-auto text-muted-foreground">
                    Your generosity fuels our ministry from community outreaches to missions, and everything in between.
                </p>
            </div>

            <form
                action="https://www.payfast.co.za/eng/process"
                method="post"
                target="_blank"
                className="border border-aero-400 rounded-lg p-10 space-y-10 w-full max-w-2xl"
            >
                {/* Required Merchant Info */}
                <input type="hidden" name="merchant_id" value="24181130" />
                <input type="hidden" name="merchant_key" value="lhg9udtxhawad" />
                {/* <input type="hidden" name="return_url" value="https://your-site.com/thank-you" /> */}
                {/* <input type="hidden" name="cancel_url" value="https://your-site.com/cancelled" /> */}
                {/* Payment Info */}
                <input type="hidden" name="item_name" value="Donation" />
                <input type="hidden" name="item_description" value="Support our ministry" />
                <input type="hidden" name="currency" value="ZAR" />

                {/* Donation Amount */}
                <div>
                    <Input
                        type="number"
                        name="amount"
                        min="1"
                        max="2147483647"
                        step="0.01"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter your amount (ZAR)"
                    />
                </div>

                <div className="flex items-center justify-between w-full gap-2">
                    <Button variant="secondary" type="button" onClick={() => setAmount('25')}>R25</Button>
                    <Button variant="secondary" type="button" onClick={() => setAmount('100')}>R100</Button>
                    <Button variant="secondary" type="button" onClick={() => setAmount('125')}>R125</Button>
                    <Button variant="secondary" type="button" onClick={() => setAmount('')}>Custom Amount</Button>
                </div>

                {/* Personal Info */}
                <div className="flex flex-col gap-2">
                    <p className="font-semibold text-xl">Your Details</p>
                    <div className="flex items-center gap-4">
                        <Input
                            type="text"
                            name="name_first"
                            // required
                            icon="user"
                            placeholder="First Name"
                        />
                        <Input
                            type="text"
                            name="name_last"
                            // required
                            icon="user"
                            placeholder="Last Name"
                        />
                    </div>
                    <Input
                        type="email"
                        name="email_address"
                        required
                        icon="mail"
                        placeholder="Email Address"
                    />
                </div>

                <Button type="submit" className="w-full">
                    Give Now with PayFast
                </Button>
            </form>
        </section>
    );
};

export default Donations;
