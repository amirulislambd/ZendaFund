"use client";

import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";

import { Select, Label, Description, ListBox } from "@heroui/react";
import { CreateWithdrawal } from "@/lib/actions/withdraw";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type FormValues = {
  withdrawal_credit: number;
  account_number: string;
  payment_system: string;
};

interface Props {
  availableCredits: number;
}

export default function WithdrawalForm({ availableCredits }: Props) {
  const {
    register,
    watch,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      withdrawal_credit: 0,
      account_number: "",
      payment_system: "Bkash",
    },
  });
  const router = useRouter();
  const credits = Number(watch("withdrawal_credit") || 0);

  const withdrawalAmount = Number((credits / 20).toFixed(2));

  const onSubmit = async (data: FormValues) => {
    const response = await CreateWithdrawal({
      withdrawal_credit: data.withdrawal_credit,
      withdrawal_amount: withdrawalAmount,
      payment_system: data.payment_system,
      account_number: data.account_number,
    });

    if (response?.success) {
      toast.success(response.message);
      router.refresh();
      reset();
    } else {
      toast.error(response?.message || "Something went wrong");
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        rounded-[32px]
        border
        border-white/10
        bg-[#071425]
        p-6
        md:p-8
        shadow-[0_20px_60px_rgba(0,0,0,.25)]
      "
    >
      {/* Header */}

      <div className="mb-8 text-center">
        <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
          Withdrawal Request
        </div>

        <h2 className="mt-4 text-3xl font-bold text-white">
          Withdraw Your Earnings
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-slate-400">
          Convert your earned credits into real money and transfer them securely
          to your preferred payment method.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Credits Input */}

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Credits To Withdraw
            </label>

            <input
              type="number"
              max={availableCredits}
              placeholder="Enter credits"
              className="
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-4
            py-3
            text-white
            placeholder:text-slate-500
            outline-none
            transition-all
            duration-300
            focus:border-cyan-400/40
            focus:bg-white/10
            focus:ring-2
            focus:ring-cyan-500/20
          "
              {...register("withdrawal_credit", {
                required: true,
                min: 1,
                max: availableCredits,
                valueAsNumber: true,
              })}
            />

            {errors.withdrawal_credit && (
              <p className="mt-2 text-xs text-red-400">
                Enter a valid credit amount
              </p>
            )}
          </div>

          {/* USD Amount */}

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Withdrawal Amount ($)
            </label>

            <input
              readOnly
              value={withdrawalAmount}
              className="
            w-full
            rounded-2xl
            border
            border-emerald-500/20
            bg-emerald-500/5
            px-4
            py-3
            font-semibold
            text-emerald-400
            outline-none
          "
            />
          </div>

          {/* Payment Method */}

          <div>
            <Controller
              name="payment_system"
              control={control}
              render={({ field }) => (
                <Select
                  selectedKey={field.value}
                  onSelectionChange={(key) => field.onChange(String(key))}
                >
                  <Label>Payment System</Label>

                  <Description>
                    Select your preferred payment method
                  </Description>

                  <Select.Trigger className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="Bkash">
                        <Label>Bkash</Label>
                      </ListBox.Item>

                      <ListBox.Item id="Nagad">
                        <Label>Nagad</Label>
                      </ListBox.Item>

                      <ListBox.Item id="Rocket">
                        <Label>Rocket</Label>
                      </ListBox.Item>

                      <ListBox.Item id="Bank">
                        <Label>Bank Transfer</Label>
                      </ListBox.Item>

                      <ListBox.Item id="Stripe">
                        <Label>Stripe</Label>
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              )}
            />
          </div>

          {/* Account Number */}

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Account Number
            </label>

            <input
              type="text"
              placeholder="Enter account number"
              className="
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-4
            py-3
            text-white
            placeholder:text-slate-500
            outline-none
            transition-all
            duration-300
            focus:border-cyan-400/40
            focus:bg-white/10
            focus:ring-2
            focus:ring-cyan-500/20
          "
              {...register("account_number", {
                required: true,
              })}
            />

            {errors.account_number && (
              <p className="mt-2 text-xs text-red-400">
                Account number is required
              </p>
            )}
          </div>
        </div>

        {/* Live Conversion Card */}

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
          <p className="text-sm text-slate-400">Live Conversion</p>

          <h3 className="mt-2 text-xl font-bold text-cyan-400">
            {credits || 0} Credits = ${withdrawalAmount}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Current Rate: 20 Credits = $1
          </p>
        </div>
        {/* Validation */}

        {credits > availableCredits && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
            <p className="font-medium text-red-400">
              Cannot withdraw more than your available credits.
            </p>
          </div>
        )}

        {availableCredits < 200 && (
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
            <p className="font-medium text-amber-400">
              Minimum 200 credits are required to request a withdrawal.
            </p>
          </div>
        )}

        {/* Submit Button */}

        <button
          type="submit"
          disabled={
            availableCredits < 200 || credits <= 0 || credits > availableCredits
          }
          className="
    group
    relative
    w-full
    overflow-hidden
    rounded-2xl
    bg-gradient-to-r
    from-emerald-500
    via-cyan-500
    to-blue-600
    py-4
    text-sm
    font-semibold
    text-white
    shadow-[0_10px_30px_rgba(16,185,129,.25)]
    transition-all
    duration-500
    hover:-translate-y-1
    hover:shadow-[0_18px_40px_rgba(16,185,129,.45)]
    active:scale-[0.99]
    disabled:cursor-not-allowed
    disabled:opacity-50
    disabled:hover:translate-y-0
  "
        >
          {/* Shine Effect */}

          <span className="absolute inset-0 overflow-hidden rounded-2xl">
            <span
              className="
        absolute
        -left-20
        top-0
        h-full
        w-12
        -skew-x-12
        bg-white/30
        blur-sm
        transition-all
        duration-700
        group-hover:left-[120%]
      "
            />
          </span>

          <span className="relative">Withdraw Funds</span>
        </button>
      </form>
    </motion.div>
  );
}